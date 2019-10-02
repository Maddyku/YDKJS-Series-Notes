//Chapter 1: this or That?

function identify() {
	return this.name.toUpperCase();
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
console.log( greeting );
}

var me = { 
		name: "Kyle"
};

var you = {
		name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER
speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER


function foo() {
    console.log( this.a );
}

var a = 2;
foo();	//2

function foo() {
	"use strict";

	console.log( this.a );
}

var a = 2;

foo(); // TypeError: `this` is `undefined`


function foo() {
    console.log(this.a); //2
}

var obj = {
    a: 2, 
    foo: foo //obj now references to foo function
};

obj.foo();	/*Implicit binding  rule -> context object (obj)
is used as "this" for function reference (foo()) 
so this.a = obj.a = 2 */

function foo() {
    console.log(this.a);
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); //42
/* Only the last level of an object property
 reference chain matters to the call-site,
 hence a points to 42 of obj2 the last call site before foo()*/


function foo() {
	console.log(this.a);
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; //function reference
var a = "oops, global"; //a also property on global object
bar();	/*Default binding applies in this case, because although it seems like 
bar() should console.log "2" from obj.a call site is bar() so we get
console.log of "oops, global" */


function foo() {
    console.log(this.a);
}

function doFoo(fn) {
    fn(); //call-site!
}	

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a now property on global object

doFoo(obj.foo); /* "oops, global", BC default binding applies
and we refer to the global object a*/



function foo() {
    console.log(this.a);
}

var obj = { 
    a: 2,
    foo: foo
};

var a = "oops, global"; // a property on global object
setTimeout(obj.foo, 100); //"oops, global" from global object BC default binding


function foo() {
    console.log(this.a);
}

var obj = { 
    a: 2
};

foo.call(obj); /* 2
Invoking foo with explicit binding allows this to be obj */

function foo() {
    console.log(this.a);
}

var obj = { 
    a: 2
};

var bar = function() {
    foo.call(obj);
};
/* bar hard binds foo's this to obj permanently */

bar(); //2
setTimeout(bar, 100);  //2
bar.call(window);  //2


function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    return foo.apply(obj, arguments);
};

var b = bar(3);  //2 3
console.log(b);  //5


function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

//simple bind helper
function bind(fn, obj) {
    return function() {
            return fn.apply(obj, arguments);
    };
}

var obj = {
    a: 2
};

var bar = bind(foo, obj);

var b = bar(3);	//2 3
console.log(b);	//5


//ES5 builit in utility -> Function.prototype.bind
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind(obj);

var b = bar(3);  //2 3
console.log(b);


//API Call "Contexts"
function foo(el) {
    console.log(el, this.id);
}

var obj = {
    id: "awesome"
};

// use obj as this for foo() calls
[1, 2, 3].forEach(foo, obj); // 1 awesome 2 awesome 3 awesome


//new Binding
function foo(a) {
    this.a = a;
}

var bar = new foo(2);
console.log(bar.a);	//2


function foo() {
    console.log(this.a);
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo();	//2
obj2.foo();	//3

obj1.foo.call(obj2);	//3
obj2.foo.call(obj1);	//2



function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a);	//2
obj1.foo.call(obj2, 3);
console.log(obj2.a);	//3

var bar = new obj1.foo(4);
console.log(obj1.a);	//2
console.log(bar.a); 	//4



function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);  //2

var baz = new bar(3);
console.log(obj1.a);  //2
console.log(baz.a);  //3



if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to ES5 JS							//internal IsCallable function
			throw new TypeError("Function.prototype.bind - 				what" + "is trying to be bound is not callable"
            );
    }

var aArgs = Array.prototype.slice.call(arguments, 1),
		fToBind = this,
		fNOP = function(){},
		fBound = function(){
			return fToBind.apply(
				(
					this instanceof fNOP &&
					oThis ? this : oThis
				),													aArgs.concat(Array.prototype.slice.call(arguments))
	  );
    }
 ;

fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();

return fBound;
};
}



//Lexical this & fat arrow-function =>

function foo() {
    // return an arrow function
    return (a) => {
            //this here is lexically adopted from foo()
            console.log(this.a);
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

var bar = foo.call(obj1);
bar.call(obj2);	//2, not 3!
/* fat arrow function created in foo() lexically captures whatever
foo()s this is at its call-time.  */


function foo() {
    setTimeout(() => {
            // this here is lexically adopted from foo()
            console.log(this.a);
    }, 100);
}

var obj = {
    a: 2
};

foo.call(obj);  //2


//Chapter 3: Objects


var strPrimitive = "I am a string";
typeof strPrimitive;  //"string"
strPrimitive instanceof String;  //false

var strObject = new String("I am a string");
typeof strObject;  //"object"
strObject instanceof String;  //true

//inspect the object subtype
Object.prototype.toString.call(strObject); // [object String]


var strPrimitive = "I am a string";
console.log(strPrimitive.length);  //13 (includeing spaces)
console.log(strPrimitive.charAt(3));  //"m"

//Contents
var myObject = {
    a: 2
};

myObject.a;  //2  with property access syntax
myObject["a"];  //2 with key access syntax


var wantA = true;
var myObject =  {
        a: 2
};

var idx;

if (wantA) {
        idx = "a";
}

//  later
console.log(myObject[idx]);  //2



var myObject = {};

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];  //  "foo"
myObject["3"];  // "bar"
myObject["[object Object]"];  // "baz"



var prefix = "foo";

var myObject = {
		[prefix + "bar"]: "hello",
		[prefix + "baz"]: "world"
};
myObject["foobar"];  //hello
myObject["foobaz"];  //world


var myObject = {
    [Symbol.Something]: "hello world"
};
myObject[Symbol.Something];
//"hello world"


function foo() {
    console.log("foo");
}

var someFoo = foo;	//variable reference to foo

var myObject = {
    someFoo: foo
};

foo;	// function foo(){}
someFoo;	//function foo(){}
myObject.someFoo;	//function foo(){}


var myObject = {
    foo: function foo() {
        console.log("foo");
    }
};

var someFoo = myObject.foo;
someFoo;	//function foo(){}
myObject.foo;	//function foo(){}


//Arrays

var myArray = ["foo", 42, "bar"];
myArray.length;	//3
myArray[0];	//"foo"
myArray[2];	//"bar"


var myArray = ["foo", 42, "bar"];
myArray.baz = "baz";
myArray.length;	//3 - Adding named properties such as .baz does not change length of array
myArray.baz;  //"baz"


var myArray = ["foo", 42, "bar"];
myArray[3] = "baz";
myArray.length;	//4
myArray[3];  //"baz"


function anotherFunction() {/*..*/}

var anotherObject = {
		c: true
};

var anotherArray = [];

var myObject = {
		a: 2,
		b: anotherObject, //reference, not a copy!
    	c: anotherArray,  //another reference!
		d: anotherFunction
};
anotherArray.push(anotherObject, myObject);


var newObj = Object.assign({}, myObject);

newObj.a;  //2
newObj.b === anotherObject;	//true
newObj.c === anotherArray;  //true
newObj.d === anotherFunction;  //true




var myObject = {
    a: 2
};
//Property Descriptor - Data Descriptor
Object.getOwnPropertyDescriptor( myObject, "a");
/* {
    value: 2,
     writable: true,
    enumerable: true,
    configurable: true
}*/


var myObject = {};

Object.defineProperty(myObject, "a", {
		value: 2, 
		writable: true, // writable - ability to change value of property
		configurable: true, //configurable - ability to modify its descriptor definition
		enumerable: true //enumerable - controls if property will show up in object-property enumerations such as for .. in loop
});
myObject.a;  //2

//Writable

var myObject = {};
Object.defineProperty(myObject, "a", {
		value: 2,
		writable: false,  //not writable!
		configurable: true,
		enumerable: true
});
myObject.a = 3; //3
myObject.a; //2 since writable set to false


//Configurable

var myObject = {
    a: 2
};

myObject.a = 3;
myObject.a;	//3

Object.defineProperty(myObject, "a", {
    value: 4,
    writable: true,
    configurable: false, //not configurable!
    enumerable: true
});

myObject.a;	//4
myObject.a = 5;
myObject.a; //5

Object.defineProperty(myObject, "a", {
    value: 6, 
    writable: true, 
    configurable: true,
    enumerable: true
});  /* TypeError because we previously defined Property with 
not configurable so we cannot change its DescriptorDefinition 
at all or redefine the same Property of myObject a second time*/


var myObject = {
    a: 2
};

myObject.a;	//2
delete myObject.a;
myObject.a;	//undefined

Object.defineProperty(myObject, "a", {
        value: 2,
        writable: true,
        configurable: false,
        enumerable: true
});

myObject.a;	//2
delete myObject.a;
myObject.a;	//2
/* Because configurable is set to false, we can't delete
myObject properties so myObject.a still equals 2 */


//Object Constant

var myObject = {};

Object.defineProperty(myObject, "FAVORITE_NUMBER", {
		value: 42,
		writable: false, 
		configurable: false
});
// {FAVORITE_NUMBER: 42}

//Prevent Extensions

var myObject = {
    a: 2
};

Object.preventExtensions(myObject);

myObject.b = 3;
myObject.b; //Undefined
myObject.a; //2


//Getters & Setters

var myObject = {
    // define a getter for a
    get a() {
            return 2;
    }
};

Object.defineProperty(
        myObject,   //target
        "b",  		//property name
        {			//descriptor
            //define a getter for b
            get: function(){ return this.a * 2},
                
            //make sure b shows up as an object property
            enumerable: true
        }
);
myObject.a; //2
myObject.b; //4



var myObject = {
            // define a getter for a 
            get a() {
                return 2;
            }
};

myObject.a = 3;
myObject.a; //2 because custom getter is hard-coded to return only 2



var myObject = {
    //define a getter for a
    get a() {
            return this._a_;
    },

    //define a setter for a
    set a(val) {
            this._a_ = val * 2;
    }
};

myObject.a = 2;
myObject.a; //4



var myObject = {
    a: 2
};

("a" in myObject);	//true
("b" in myObject);	//false

myObject.hasOwnProperty("a");  //true
myObject.hasOwnProperty("b");  //false


//Enumerability

var myObject = {};

Object.defineProperty(
		myObject,
		"a",
		// make a enumerable as normal
    	{enumerable: true, value: 2}
);

Object.defineProperty(
		myObject,
		"b",
		// make b non-enumerable
    {enumerable: false, value: 3}
);

myObject.b;	//3
("b" in myObject); //true
myObject.hasOwnProperty("b"); //true

for (var k in myObject) {
		console.log(k, myObject[k]);
}  /* "a" 2 
    "b 3 does not show up because b in myObject is non-enumerable */
   


    var myObject = {};

    Object.defineProperty(
            myObject,
            "a",
            //make a enumerable as normal
            { enumerable: true, value: 2 }
    );
    
    Object.defineProperty(
            myObject,
            "b",
            //make b non-enumerable
        {enumerable: false, value: 3}
    );
    
    myObject.propertyIsEnumerable("a"); //true
    myObject.propertyIsEnumerable("b"); //false
    
    Object.keys(myObject); //["a"]
    Object.getOwnPropertyNames(myObject); //["a", "b"]


//Iteration with for loop

var myArray = [1, 2, 3];

for (var i = 0; i < myArray.length; i++) {
			console.log(myArray[i]);
}	//1 2 3


//For..of loop syntax in ES6

var myArray = [1, 2, 3];

for (var v of myArray) {
		console.log(v);
}	// 1 2 3

var myArray = [1, 2, 3];
var it = myArray[Symbol.iterator]();

it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
it.next(); // {value: undefined, done: true}



var myObject = {
    a: 2,
    b: 3
};

Object.defineProperty(myObject, Symbol.iterator , {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys(o);
        return {
                next: function() {
                        return {
                                value: o[ks[idx++]],
                                done: (idx > ks.length)
                        };
                }
        };
  }
});

//iterate myObject manually
var it = myObject[Symbol.iterator]();
it.next();  // {value:2, done:false}
it.next();  // {value:3, done:false}
it.next();  // {value:undefined, done:true}

// iterate myObject with for..of
for (var v of myObject) {
    console.log(v);
}  // 2 3



var randoms = {
    [Symbol.iterator]: function() {
            return { 
                    next: function() {
                            return {value: Math.random()};
                    }
            };
    }
};

var randoms_pool = [];
for (var n of randoms) {
    randoms_pool.push(n);
    
    // don't proceed unbounded!
    if (randoms_pool.length === 100) break;
}



//Chapter 4: Mixing (Up) "Class" Objects


//Constructor

class CoolGuy {
    specialTrick = nothing

    CoolGuy(trick) {
        specialTrick = trick
    }

    showOff() {
        output("Here's my trick: ", specialTrick)
    }
}

Joe = new CoolGuy("jumping rope");
Joe.showOff() //Here's my trick: jumping rope



class Vehicle {
	engines = 1

	ignition() {
		output( "Turning on my engine." )
	}

	drive() {
		ignition()
		output( "Steering and moving forward!" )
	}
}

class Car inherits Vehicle {
	wheels = 4

	drive() {
		inherited:drive()
		output( "Rolling on all ", wheels, " wheels!" )
	}
}

class SpeedBoat inherits Vehicle {
	engines = 2

	ignition() {
		output( "Turning on my ", engines, " engines." )
	}

	pilot() {
		inherited:drive()
		output( "Speeding through the water with ease!" )
	}
}


// Mixins

var Something = {
    cool: function() {
            this.greeting = "Hello World";
            this.count = this.count ? this.count + 1 : 1;
    }
};

Something.cool();
Something.greeting;	// "Hello World"
Something.count;	// 1

var Another = {
    cool: function() {
        // implicit mixin of Something to Another
        Something.cool.call(this);
    }
};

Another.cool();
Another.greeting;	// "Hello World"
Another.count;	// 1



//Chapter 5 Prototypes

//[[Prototype]]
var myObject = {
    a:2
};

myObject.a;		//2



var anotherObject = {
    a:2
};

//	create an object linked to anotherObject
undefined
var myObject = Object.create(anotherObject);

for (var k in myObject) {
    console.log("found: " + k);
}
//found: a

("a" in myObject);	//true



//Shadowing Properties

var anotherObject= {
    a: 2
};

var myObject = Object.create(anotherObject);

anotherObject.a;  //2
myObject.a;	 //2

anotherObject.hasOwnProperty("a");  //true
myObject.hasOwnProperty("a");  //false

myObject.a++;	//oops, implicit shadowing!

anotherObject.a;	//2
myObject.a;		//3

myObject.hasOwnProperty("a");	/*true Because a has now been 
implicitly shadowed onto myObject as a Property */



//"Class" Functions

function Foo() {
    // ...
}
Foo.prototype;	// {constructor: ƒ}



function Foo() {
    // ...
}
var a = new Foo();
Object.getPrototypeOf(a) === Foo.prototype;  //true


function Foo() {
	//  ...
}

Foo.prototype.constructor === Foo;  //true

var a = new Foo();
a.constructor === Foo;  //true



function NothingSpecial() {
	console.log("Don't mind me!");
}

var a = new NothingSpecial();
//	"Don't mind me!"

a; // NothingSpecial {}


//Mechanics

function Foo(name) {
    this.name = name;
}

Foo.prototype.myName = function() {
    return this.name;
};

var a = new Foo("a");
var b = new Foo("b");

a.myName();  //a
b.myName();  //b


//Constructor Redux

function Foo()  { /* */ }

Foo.prototype = { /* */ }  //create a new prototype object

var a1 = new Foo();
a1.constructor === Foo;    //false!
a1.constructor === Object; //true!



function Foo()  { /* .. */ }
Foo.prototype = { /* .. */ }; //create a new prototype object

/* Need to properly fix the missing .constructor
Property on the new object serving as Foo.prototype
See Chapter 3 for defineProperty(..) */

Object.defineProperty( Foo.prototype, "constructor" , {
		enumerable: false,
		writable: true,
		configurable: true,
		value: Foo	//point .constructor at Foo
} );  // {constructor: ƒ}constructor: ƒ Foo()__proto__: Object



//Prototypal Inheritance

function Foo(name) {
    this.name = name;
}

Foo.prototype.myName = function() {
    return this.name;
};

function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}

// here, we make a new Bar.prototype linked to Foo.prototype
Bar.prototype = Object.create(Foo.prototype);

/* Beware, now Bar.prototype.constructor is gone and might need to be manually fixed if you're in the habit of relying on such properties! */ 
Bar.prototype.myLabel = function() {
    return this.label;
};

var a = new Bar("a", "obj a");

a.myName();	//"a"
a.myLabel(); //"obj a"



Bar.prototype = Foo.prototype;
/* Doesn't work like you want!
Makes Bar.prototype be another reference to Foo.prototype */

Bar.prototype = new Foo()  // Foo {name: undefined}
/* Works kinda like you want with side-effect u don't want
Creates a new object which is linked to Foo.prototype using the Foo() 
constructor call to do it */


//pre ES6 -> throws away default exisiting Bar.prototype
Bar.prototype = Object.create(Foo.prototype);

//ES6 -> modifies existing Bar.prototype
Object.setPrototypeOf(Bar.prototype, Foo.prototype);    // Foo {}



// Inspecting "Class" Relationships

function Foo() {
    // ...
}

Foo.prototype.blah;
var a = new Foo();

a instanceof Foo; //True


// Create() Links
var foo = {
        something: function() {
            console.log("Tell me something good ... ");
        }
};

var bar = Object.create(foo); 
/* Object.create() creates a new object "bar" linked to the 
object specified "foo" */
bar.something(); //Tell me something good..


//Object.create() Polyfilled

if (!Object.create) {
    Object.create = function(o) {
            function F(){}
            F.prototype = o;
            return new F();
    };
}




var anotherObject = {
    a: 2
};

var myObject = Object.create( anotherObject, {
    b:  {
            enumerable: false,
            writable: true,
            configurable: false,
            value: 3
         },

     c:	 {
            enumerable: true,
            writable: false,
            configurable: false,
            value: 4
           }
});

myObject.hasOwnProperty("a"); //false Because a exists in anotherObject
anotherObject.hasOwnProperty("a"); //true

myObject.hasOwnProperty("b"); //true
myObject.hasOwnProperty("c"); //true

myObject.a;	//2
myObject.b;	//3
myObject.c;	//4


function createAndLinkObject(o) {
    function F(){}
    F.prototype = o;
    return new F();
}

var anotherObject = {
    a: 2
};

var myObject = createAndLinkObject(anotherObject);
myObject.a;	//2



var anotherObject = {
    cool: function() {
            console.log("cool!");
    }
};

var myObject = Object.create(anotherObject);
myObject.cool();  //"cool!"



var anotherObject = {
    cool: function() {
            console.log("cool!");
    }
};

var myObject = Object.create(anotherObject);

myObject.doCool = function() {
        this.cool();	//internal delegation!
};

myObject.doCool()   //cool!




//Chapter 6: Behavior Delegation

//Delegation Theory
var Task = {
    setID: function(ID) {this.id = ID;},
    outputID: function() {console.log(this.id);}
};

//make XYZ delegate to Task
var XYZ = Object.create(Task);

XYZ.prepareTask = function(ID, Label) {
    this.setID(ID);
    this.label = Label;
};

XYZ.outputTaskDetails = function() {
    this.outputID();
    console.log(this.label);
};

/*  ABC = Object.create(Task);
ABC ... = ...
ƒ () {
    this.outputID();
    console.log(this.label);
}   */


function Foo() {}
var a1 = new Foo();
a1; //Foo {}


function Foo() {}

var a1 = new Foo();

Foo.prototype.constructor = function Gotcha(){};

a1.constructor;	 //Gotcha(){}
a1.constructor.name;  //Gotcha
a1;  //Foo {}



var Foo = {};

var a1 = Object.create(Foo);

a1;  //Object {}

Object.defineProperty(Foo, "constructor", {
		enumerable: false,
		value: function Gotcha(){}
});

a1;	//Gotcha {}

//Comparing Mental Models


// Prototypal OO (Object-Oriented) Style
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function() {
    return "I am " + this.me;
};

function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function() {
    alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();  //alert(Hello, I am b1.)
b2.speak();  //alert(Hello, I am b2.)


// OLOO (Objects Linked-to-Other Objects) Style
var Foo = {
    init: function(who) {
            this.me = who;
    },
    identify: function() {
            return "I am " + this.me;
    }
};

var Bar = Object.create(Foo);

Bar.speak = function() {
    alert("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");

b1.speak();
b2.speak();


//OLOO Code Architecture

var LoginController = {
    errors: [],
    getUser: function() {
        return document.getElementById("login_username").value;
    },
	getPassword: function() {
		return document.getElementById("login_password").value;
    },
	validateEntry: function(user, pw) {
		user = user || this.getUser();
		pw = pw || this.getPassword();
		
		if (!(user && pw)) {
			return this.failure("Please enter a username & password!");
        }
		else if (pw.length < 5) {
			return this.failure("Password must be 5+ characters!");
        }

		// got here? validated!
		return true;
    },
	showDialog: function(title, msg) {
		//display success message to user in dialog
    },
	failure: function(err) {
		this.errors.push(err);
		this.showDialog("Error", "Login invalid: " + err);
    }
};

// Link AuthController to delegate to LoginController

var AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.checkAuth = function() {
	var user = this.getUser();
	var pw = this.getPassword();

	if (this.validateEntry(user, pw)) {
		this.server("/check-auth", {
				user: user,
				pw: pw
        } )
		.then(this.accepted.bind(this))
		.fail(this.rejected.bind(this));
    }
};
AuthController.server = function(url, data) {
		return $.ajax( {
				url: url,
				data: data 
        } );
};
AuthController.accepted = function() {
		this.showDialog("Success", "Authenticated!")
};
AuthController.rejected = function(err) {
		this.failure("Auth Failed: " + err);
};


// ES6 Concise Method Declarations

//use nicer object literal syntax w/ concise methods!

var LoginController = {
        errors: [],
        getUser() {},
        getPassword() {}
};

var AuthController = {
		errors: [],
		checkAuth() {},
		server(url, data) {}
};

//Now, Link AuthController to delegate to LoginController
Object.setPrototypeOf(AuthController, LoginController);
// {errors: Array(0), checkAuth: ƒ, server: ƒ}



// Type Introspection with class instances

var Foo = { };
var Bar = Object.create(Foo);
var b1 = Object.create(Bar);

//relating Foo and Bar to each other
Foo.isPrototypeOf(Bar);  //true
Object.getPrototypeOf(Bar) === Foo;  //true

//relating b1 to both Foo and Bar
Foo.isPrototypeOf(b1);  //true
Bar.isPrototypeOf(b1);  //true
Object.getPrototypeOf(b1) === Bar;  //true