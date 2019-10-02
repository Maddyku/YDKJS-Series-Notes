//Chapter 1: Types

typeof undefined === "undefined";  //true
typeof true === "boolean";  //true
typeof 42 === "number";  //true
typeof "42" === "string";  //true
typeof {life: 42} === "object"  //true

// added in ES6!
typeof Symbol() === "symbol";  //true


typeof null === "object";  //true

// bug in JS
undefined
typeof function a(){} === "function";  //true

function a(b, c) {}

a.length;  // 2 -> Because 2 parameters b & c
typeof [1, 2, 3] === "object";  //true


// Values as Types

var a = 42;
typeof a;  //"number"

a = true;
typeof a;  //"boolean"

typeof typeof 42;  //string -> because typeof 42 returns "number" and typeof number is string


//  undefined vs undeclared

//undefined vs undeclared

/* Calling typeof against variables that are
undefined (that have no value currently) will return undefined */
var a; 

typeof a;  //"undefined"

var b = 42;  //"boolean"
var c;

b = c;

typeof b; //"undefined"
typeof c; //"undefined"


var a;

a;  //undefined
b;  //ReferenceError: b is undefined




//Chapter 2: Values

//Arrays

var a = [ 1, "2", [3] ];

a.length;  //3
a[0] === 1;  //true
a[2][0] === 3;  //true


var a = [];
a.length;	//0

a[0] = 1;
a[1] = "2";
a[2] = [3];
a.length;  //3



var a = [];

a[0] = 1;  //no a[1] slot set here
//no a[1] slot set here
a[2] = [3];

a[1];	//undefined
a.length;	//3



var a = [ ];

a[0] = 1;
a["foobar"] = 2;
/* String key-value pairs are not numerically indexed 
and don't count toward the length of the array */

a.length;	//1
a["foobar"];	//2
a.foobar;	//2


var a = [ ];

a["13"] = 42;
a.length; //14



function foo() {
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}

foo("bar", "baz"); // ["bar", "baz", "bam"]



//Strings

var a = "foo";
var b = ["f","o","o"];

a.length;  //3
b.length;  //3

a.indexOf("o");  //1
b.indexOf("o");  //1

var c = a.concat("bar");  //"foobar"
var d = b.concat(["b","a","r"]);  //["f","o","o","b","a","r"]

a === c;  //false
b === d;  //false

a;  //"foo"
b;  //["f","o","o"]



c = a.toUpperCase();
a === c;	//false
a; //"foo"
c; //"FOO"

b.push("!");
b; //["f", "o", "o", "!"]




a.join;  //undefined
a.map; //undefined
var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
		return v.toUpperCase() + ".";
}).join("");
c;  //"f-o-o"
d; //"F.O.O"


a.reverse; //undefined
b.reverse(); // ["!","o","o","f"]



var c = a
        //split a into an array of characters
        .split("")
        //reverse the array of characters
        .reverse()
        //join the array of characters back to a string
        .join("");
c;  //"oof"



//Numbers

// Numeric Syntax

var a = 42;
var b = 42.3;

var a = 0.42;
var b = .42;

var a = 5E10;
a;	// 50000000000
a.toExponential();  // "5e+10"

var b = a * a;
b;  // 2.5e+21

var c = 1 / a;
c;  // 2e-11


var a = 42.59;
/* toFixed() Method specifies how many fractional decimal
places should be used to represent the value */
a.toFixed(0); //43
a.toFixed(1); //42.6
a.toFixed(2); //42.59
a.toFixed(3); //42.590
a.toFixed(4); //42.5900

var a = 42.59;
/* toPrecision() Method specifies how many significant digits
should be used to represent the value */
a.toPrecision(1); //4e+1
a.toPrecision(2); //43
a.toPrecision(3); //42.6
a.toPrecision(4); //42.59
a.toPrecision(5); //42.590
a.toPrecision(6); //42.5900


var onethousand = 1E3;  // 1 * 10^3
var onemilliononehundredthousand = 1.1E6;  // 1.1 * 10^6

0xf3;  //hexadecimal for 243
0Xf3;  //ditto
0363;  //octal for 243


0.1 + 0.2 === 0.3;  /* false because 0.1 and 0.2 in binary floating-point are not exact so when they are added the result is not 0.3 but 0.30...04*/

if (!Number.EPSILON) {
			Number.EPSILON = Math.pow(2, -52);
}

function numbersCloseEnoughToEqual(n1,n2) { 
		return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a,b);  //true



//The non-value Values

//undefined is a missing value

function foo() {
        undefined = 2; //really bad idea!
}

foo();  //undefined


function foo() {
    "use strict";
    undefined = 2;	//TypeError!
}

foo();  /* Uncaught TypeError: Cannot assign to read only
property 'undefined' of object '#<Window>' */


function foo() {
    "use strict";
    var undefined = 2;
    console.log(undefined);  
}

foo();  /* 2 -> because undefined is a built-in identifier
that holds unless modified */


/* void Operator - void "voids" out any value so result of
expression is undefined */
var a = 42;
console.log(void a, a);  //undefined 42


//Special Numbers

//Not a Number (NaN)
var a = 2 / "foo";	//NaN
typeof a === "number";  //true


isNaN(a); //true
a == NaN;   //false
a === NaN;  //false
// NaN is never equal to NaN!!


//Special Equality

var a = 2/"foo";
var b = -3 * 0;

Object.is(a, NaN); //true
Object.is(b, -0);  //true
Object.is(b, 0);   //false


//Value vs Reference
var a = 2; //scalar primitive type - number
var b = a;  //b is always a copy of the value in a
b++;
a; //2
b; //3
/* scalar primitives (null, undefined, string, number, 
boolean, symbol are always passed by value-copy */

var c = [1,2,3]; //compound value type - array
var d = c; //d is a reference to the shared value in c
d.push(4);
c; //[1,2,3,4]
d; //[1,2,3,4]
/* compound values (objects (including arrays) and functions)
always create a copy of the reference on passing */


var a = [1,2,3];
var b = a;
a;  //[1,2,3]
b;  //[1,2,3]

//later
b = [4,5,6];
a;  //[1,2,3] /* making a new assignment in b does nothing to affect where a is still referencing [1,2,3]*/
b;  //[4,5,6]


function foo(x) {
    x.push(4);
    x;  //[1,2,3,4]

    // later
    x = [4,5,6];
    x.push(7);
    x;  //[4,5,6,7]
}

var a = [1,2,3];
foo(a);
a;  //[1,2,3,4]


function foo(x) { 
        x.push(4);
        x;  //[1,2,3,4]

        //later
        x.length = 0;  //empty existing array in-place
        x.push(4,5,6,7);
        x;  //[4,5,6,7]
}

var a = [1,2,3];
foo(a);
a;  //[4,5,6,7]



function foo(wrapper) {
    wrapper.a = 42;
}

var obj = {
    a: 2
};

foo(obj);
obj.a;	//42



//Chapter 3: Natives

var s = new String("Hello World!");
console.log(s.toString() );  //"Hello World!"

var a = new String("abc");
typeof a; //"object" ... not "String"
a instanceof String; //true
Object.prototype.toString.call(a); //"[object String"]


/* Internal [[Class]] -> Values that are typeof "object" 
are additionally tagged with an internal[[Class]] */
Object.prototype.toString.call([1,2,3]); //"[object Array]"
Object.prototype.toString.call(/regex-literal/i); //"[object Regex]"

Object.prototype.toString.call(null); //"[object Null]"
Object.prototype.toString.call(undefined); //"[object Undefined]"

Object.prototype.toString.call("abc"); //"[object String]"
Object.prototype.toString.call(42); //"[object Number]"
Object.prototype.toString.call(true); //"[Object Boolean]"


//Boxing Wrappers
var a = "abc";

a.length; //3
a.toUpperCase(); //ABC


//Unboxing
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);

a.valueOf(); //"abc"
b.valueof(); //42
c.valueof(); //true


var a = new String("abc");
var b = a + "";	//b has the unboxed primitive value "abc"

typeof a;  //"object"
typeof b;  //"string"


//Natives as Constructors

//Array()
var a = new Array(1,2,3);
a;	//[1,2,3]

var b = [1,2,3];
b;  //[1,2,3]
var a = new Array(3);

a.length;  //3
a; //[empty × 3]



var a = new Array(3);
var b = [undefined, undefined, undefined];
var c = [];
c.length = 3;

a; //[empty × 3]
b; //[undefined, undefined, undefined]
c; //[empty × 3]


// Object() Function() RegExp()

var c = new Object();
c.foo = "bar";
c;	// {foo: "bar"}

var d = {foo: "bar"}
d;  // {foo: "bar"}

var e = new Function("a", "return a * 2");
var f = function(a) {return a * 2};
function g(a) {return a * 2}

var h = new RegExp("^a*b+", "g");
var i = /^a*b+/g;


// Symbol()

var mysym = Symbol("my own symbol");
mysym;	//Symbol(my own symbol)
mysym.toString();	//"Symbol(my own symbol)"
typeof mysym;	//"symbol"

var a = {};
a[mysym] = "foobar";

Object.getOwnPropertySymbols(a); //[Symbol(my own symbol)]


//Native Prototypes

var a = "abc";

a.indexOf("c"); //3
a.toUpperCase(); //"ABC"
a.trim(); //"abc"

typeof Function.prototype;	//"function"
Function.prototype();	//it's an empty function

RegExp.prototype.toString();	//"/(?:)/" -> empty regex
"abc".match(RegExp.prototype); //[""]



//Chapter 4: Coercion

//Converting Values
var a = 42;

var b = a + "";	//implicit coercion or Coercion
var c = String(a); //explicit coercion OR Type Casting


//toString

//multiplying 1.07 by 1000 seven times over
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;

//seven times three digits => 21 digits
a.toString();	//"1.07e21"

var a = [1,2,3];

a.toString();  // "1,2,3"

//JSON Stringification

JSON.stringify(42);		//"42"
JSON.stringify("42");	//""42"" (quoted string  val in string)
JSON.stringify(null);   //"null"
JSON.stringify(true);	//"true"

//Non JSON-safe Values

JSON.stringify(undefined);		//undefined
JSON.stringify(function(){});   //undefined
JSON.stringigy([1, undefined, function(){}, 4]); //"[1,null,null,4]"
JSON.stringify({ a:2, b:function(){} });	//"{"a":2}"


var o = {};

var a = {
		b: 42,
		c: o,
		d: function(){}
};



var o = {};

var a = {
		b: 42,
		c: o,
		d: function(){}
};

//create a circular reference inside a
o.e = a; /* would throw an error on the circular reference -> JSON.stringify(a); */

//define a custom JSON value serialization
a.toJSON = function() {
		//only include the b property for serialization
		return {b: this.b };
};

JSON.stringify(a);  // "{"b":42}"


var a = {
    val: [1,2,3],

    //probably correct!
    toJSON: function(){
            return this.val.slice(1);
    }
};

var b = {
    val: [1,2,3],

    //probably incorrect!
    toJSON: function(){
            return "[" + 
                    this.val.slice(1).join() +
            "]";
    }
};

JSON.stringify(a);  //"[2,3]"
JSON.stringify(b);  //""[2,3]""


var a = {
    b: 42,
    c: "42",
    d: [1,2,3]
};

JSON.stringify( a, ["b","c"] );  // "{"b":42,"c":"42"}"

JSON.stringify( a, function(k, v){
    if (k !== "c") return v;
});	// "{"b":42,"d":[1,2,3]}"



var a = {
    b: 42,
    c: "42",
    d: [1,2,3]
};

JSON.stringify(a, null, 3);

/* "{
    "b": 42,
    "c": "42",
    "d": [
        1,
        2,
        3
    ]
}" */

JSON.stringify(a, null, "---");

/* "{
-----"b": 42,
-----"c": "42",
-----"d": [
----------1,
----------2,
----------3
-----]
}" */


//ToNumber

var a = {
    valueOf: function(){
            return "42";
    }
};

var b = {
    toString: function() {
            return "42";
    }
};

var c = [4,2];
c.toString = function() {
            return this.join(""); // "42"
};

Number(a);		 //42
Number(b);		 //42
Number(c);		 //42
Number(""); 	 //0
Number([]); 	 //0
Number(["abc"]); //NaN


//Explicit Coercion

var a = 42;
var b = String(a);

var c = "3.14";
var d = Number(c);

b; //"42"
d; //3.14
3.14
var timestamp = Date.now();
undefined
var a = "42";	// ->Only numeric characters in string (42)
var b = "42px"; // -> Non-numeric characters (px)

Number(a); 	 //42
parseInt(a); //42
Number(b);	 //NaN -> Coercion is not tolerant of non-numeric characters & fails
parseInt(b); /*42  -> Because Parsing a numeric value out of a string is
tolerant of non-numeric charactes */



var a = new Boolean(false);
var b = new Number(0);
var c = new String("");

var d = Boolean(a && b && c);
d;	//true



function foo() {
    // bar labeled block
    bar: {
            console.log("Hello");
            break bar;
            console.log("never runs");
    }
    console.log("World!");
}

foo(); 
// Hello
// World!


//Object Destructuring

function getData() {
    // ..
    return {
            a: 42,
            b: "foo"
    };
}

var {a, b} = getData();  //ES6 Destructuring
console.log(a, b);	//42 "foo"



function foo({a,b,c}) {
    console.log(a,b,c);
}

foo ({
    c: [1,2,3],
    a: 42,
    b: "foo"
});		// 42 "foo" [1,2,3]

//Switch statement = syntactic shorthand for if..else if..else..

var a = "42";

switch (true) {
    case a == 10:
				console.log("10 or '10'");
				break;
    case a == 42:
				console.log("42 or '42'");
				break;
    default:
			//never gets here
        
}	//42 or '42'


//Chapter 5: Grammar


var a = 3 * 6; /* 3 * 6 is an expression|var a = 3 * 6 is declarative statement */
var b = a;     /* a is an expression|var b = a is declarative statement */
b; // b is an expression statement



var b; /* 42 -> completion value|implicit return of the last statement in the if block */

if (true) { 
		b = 4 + 38;
}


var obj = {
    a: 42
};

obj.a;		//42
delete obj.a;	//true -> because requested operation is allowable
obj.a;		//undefined


function pullVowels(str) {
    var matches;

    if (str) {
            //pull out all the vowels
            matches = str.match( /[aeiou]/g );
            
            if (matches) {
                    return matches;
            }
    }
}

pullVowels("Hello World");	//["e","o","o"]



function foo() {
    // bar labeled-block
    bar: {
            console.log("Hello");
            break bar;
            console.log("never runs");
    }
    console.log("World");
}

foo();
// Hello
// World