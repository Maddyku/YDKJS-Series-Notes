//Chapter 1:Into Programming

a = 21;
b = a * 2;
console.log(b);

age = prompt( "Please tell me your age: ");
console.log(age );


var a = "42";
var b = Number( a );
console.log( a );
console.log( b );

var TAX_RATE = 0.08; //8% sales tax
var amount = 99.99;
amount = amount * 2;
amount = amount + (amount * TAX_RATE);
console.log( amount ); //215.9784
console.log( amount.toFixed( 2 ) ); //215.98


var amount = 99.99;
// a general block
{ 
	amount = amount * 2;
	console.log( amount ); //199.98
}


var amount = 99.99;
// is amount big enough? If Block
if (amount > 10) {
	amount = amount * 2;
	console.log( amount ); //199.98
}

var bank_balance = 302.13;
var amount = 99.99;
if (amount < bank_balance) {
	console.log( "I want to buy the iPhone!" );
}

const ACCESSORY_PRICE = 9.99;
var bank_balance = 302.13;
var amount = 99.99;
amount = amount * 2;
// Can we afford the extra purchase?
if ( amount < bank_balance ) {
	console.log("I'll take the accessory!" );
amount = amount + ACCESSORY_PRICE;
}
// otherwise:
else {
	console.log( "No, thanks.");
}


while (numOfCustomers > 0) {
	console.log( "How may I help you?" ) ;
	// help the customer ...
	numOfCustomers = numOfCustomers - 1;
}
// versus:
do {
	console.log( "How may I help you? " );
	//help the customer...
	numOfCustomers = numOfCustomers - 1;
}	while	(numOfCustomers > 0);


var i = 0;
// a 'while..true' loop would run forever, right?
while (true) {
	//stop the loop?
	if ((i <=9) === false) {
		break;
    }
	console.log( i );
	i = i + 1;
}
// 0 1 2 3 4 5 6 7 8 9

for ( var i =0; i <=9; i = i + 1) {
    console.log( i );
}
// 0 1 2 3 4 5 6 7 8 9

function printAmount() {
    console.log( amount.toFixed( 2 )); 
}
var amount = 99.99;
printAmount(); //99.99
amount = amount * 2;
printAmount(); //199.98

function printAmount(amt) {
    console.log( amt.toFixed(2));
}
function formatAmount() {
    return "$" + amount.toFixed(2);
}
var amount = 99.99;
printAmount(amount * 2 ); //199.98
amount = formatAmount(); 
console.log(amount); //$99.99


const TAX_RATE = 0.08;
function calculateFinalPurchaseAmount(amt) { //Calculate the new amount with the tax
amt = amt + (amt * TAX_RATE);
//return the new amount
return amt;
}
var amount = 99.99;
amount = calculateFinalPurchaseAmount(amount);
console.log( amount.toFixed(2)); //107.99

function one() {
	//this 'a' only belongs to the 'one()' function
var a = 1;
console.log(a);
}
function two() {
//this 'a' only belongs to the 'two()' function
var a = 2;
console.log(a);
}
one();	//1
two();	//2


//nested scoping
function outer() {
	var a = 1;
		function inner() {
			var b = 2;
			//we can access both 'a' and 'b' here
			console.log( a + b );
	}
	inner();  //3
	//we can only access 'a' here
	console.log(a);
}
outer();  //1



//Chapter 2: Into JavaScript


//Built-in JS Types
// Variables are containers of values
var a; 
typeof a;	//undefined

a = "hello world";
typeof a;	//string

a = 42;
typeof a;	//number

a = true;
typeof a;	//boolean

a = null; 
typeof a;	//object - bug

a = undefined;	
typeof a;	//undefined

a = { b: "c" };
typeof a;	//object

//Objects

var obj = {
	a: "hello world",
	b: 42,
	c: true
};

obj.a;	//hello world
obj.b;	//42
obj.c;	//true

obj["a"];	//hello world
obj["b"];	//42
obj["c"];	//true

var obj = {
	a: "hello world",
	b: 42
};

var b = "a";
obj[b];	//hello world
obj["b"];	//42


//Arrays
var arr = [
    "hello world",
    42,
    true
];

arr[0];	//hello world
arr[1];	//42
arr[2];	true
arr.length;	//3

typeof arr;  //"object"

//Functions

function foo() {
	return 42;
}
foo.bar = "hello world";
typeof foo;		//function
typeof foo();	//number
typeof foo.bar;	//string

//Built-in Type Methods
var a = "hello world";
var b = 3.14159;
a.length; //11
a.toUpperCase
a.toUpperCase();  //HELLO WORLD
b.toFixed(2);  //3.14

//Explicit Coercion
var a = "42";
var b = Number( a ); // "42" explicitly coerced to 42 here
a;	//"42" -- String Literal
b;	//42 -- The number

//Implicit Coercion
var a = "42";
var b = a * 1; // "42" explicitly coerced to 42 here
a;	//"42" -- String Literal
b;	//42 --The number

//Equality
var a = "42";
var b = 42;

a == b;		//value equality is true w/ coercion
a === b;	//type|strict equality is false


var a = [1,2,3];
var b = [1,2,3];
var c = "1,2,3";

a == c;	//true --Loose (value) equality
b == c; //true --Loose (value) equality
a == b; //false

var a = 41;

//Inequality
var a = 41;
var b = "42";
var c = "43";

a < b;	//true
b < c; 	//true


var a = 42;
var b = "foo";

a < b;	//false
a > b;	//false
a == b;	//false
//All 3 comparisons false because b coerced to invalid number value NaN


//Variables

	//Function Scopes

		//Hoisting

		var a = 2;
		foo();	//works because 'foo()' declaration is "hoisted"
		
		function foo() { //declaring function AFTER calling it
			a = 3;
			console.log(a)	//3
			var a;	//declaration is "hoisted" to the top of foo
		}
		console.log(a);	//2

		//Nested Scopes

		function foo() {
			var a = 1;
			
			function vbar() {
				var b = 2;
		
				function baz() {
					var c = 3;
		
					console.log( a, b, c); //1, 2, 3
				}
				
				baz();
				console.log( a, b ); // 1, 2
		
			}
		
			bar();
			console.log( a );  //1
		
		}
		
		foo();

		function foo() {
			var a = 1;
		
			if (a >= 1) {
					let b = 2;
		
					while (b < 5) {
							let c = b * 2;
							b++;
		
							console.log( a + c);
					}
			}
		}
		
		foo();
		// 5 7 9

	//Conditionals

		//If..else if..else

		if (a == 2) {
			//do something
		}
		else if (a == 10) {
			//do another thing
		}
		else if (a == 42) {
			//do yet another thing
		}
		else {
				//fallback to here
		}

		//Switch Statement

		switch (a) {
			case 2:
				// do something
				break;
			case 10:
				//do another thing
				break;
			case 42: 
				//do yet another thing
				break;
			default:
				//fallback to here
		}

		//Break statements are used to end execution of program
		//if given case matches

		switch (a) {
			case 2:
			case 10:
					//Some cool stuff
					break;
			case 42:
					//Other stuff
					break;
			default:
					//fallback
		}

		//Ternary|Conditional Operator

		var a = 42;
		var b = (a > 41) ? "hello" : "world";
		//if a > 41, then b = "hello", else b = "world"

	//Strict Mode

	//This lexical block is strict mode
	function foo() {
		"use strict";
	
		//this code is strict mode
	
		function bar() {
		//this code is strict mode
		}
	}

	//This code is strict mode
	"use strict";
	function foo() {
		// this code is strict mode

		function bar() {
			// this code is strict mode
		}
	}

	//Strict mode disallows implicit auto-global variable declaration 
	//from omitting the var

	//Not only will strict mode keep your code to a safer path, and not only will it make your code more optimizable, but it also represents the future direction of the language.

	function foo() {
		"use strict";	// turn on strict mode
		a = 1;			// `var` missing, ReferenceError
	}
	
	foo();

	//Functions as values

	var foo = function() {
		//function passed into a variable
	};
	
	var x = function bar(){
		//..
	};

	//IIFE - Immediately Invoked Function Expressions
	(function IIFE(){
		console.log( "Hello!" );
	})(); 	// Hello!
	
	function foo() { .. }

	// `foo` function reference expression,
	// then `()` executes it
	foo();

	// `IIFE` function expression,
	// then `()` executes it
	(function IIFE(){ .. })();

	var a = 42;

	(function IIFE(){
		var a = 10;
		console.log( a );	// 10
	})();

	console.log( a );		// 42

	var x = (function IIFE(){
		return 42;
	})();
	
	x;	// 42


	//Closures

	function makeAdder(x) {
		// parameter `x` is an inner variable
	
		// inner function `add()` uses `x`, so
		// it has a "closure" over it
		function add(y) {
			return y + x;
		};
	
		return add;
	}

	// `plusOne` gets a reference to the inner `add(..)`
	// function with closure over the `x` parameter of
	// the outer `makeAdder(..)`
	var plusOne = makeAdder( 1 );

	// `plusTen` gets a reference to the inner `add(..)`
	// function with closure over the `x` parameter of
	// the outer `makeAdder(..)`
	var plusTen = makeAdder( 10 );

	plusOne( 3 );		// 4  <-- 1 + 3
	plusOne( 41 );		// 42 <-- 1 + 41

	plusTen( 13 );		// 23 <-- 10 + 13



	//Modules
	function User(){
		var username, password;
	
		function doLogin(user,pw) {
			username = user;
			password = pw;
	
			// do the rest of the login work
		}
	
		var publicAPI = {
			login: doLogin
		};
	
		return publicAPI;
	}
	
	// create a `User` module instance
	var fred = User();
	
	fred.login( "fred", "12Battery34!" );

	//Module Pattern - define private implementation details
	//(variables, functions) hidden from outside world
	// and public APIS accessible from the outside

//This Identifier

//this is a pointer to an object

function foo() {
	console.log( this.bar );
}

var bar = "global";

var obj1 = {
	bar: "obj1",
	foo: foo
};

var obj2 = {
	bar: "obj2"
};

// --------

foo();				// "global"
obj1.foo();			// "obj1"
foo.call( obj2 );		// "obj2"
new foo();			// undefined

//Prototypes

var foo = {
	a: 42
};

// create `bar` and link it to `foo`
var bar = Object.create( foo );

bar.b = "hello world";

bar.b;		// "hello world"
//bar prototype-linked to foo; gains a 
bar.a;		// 42 <-- delegated to `foo`