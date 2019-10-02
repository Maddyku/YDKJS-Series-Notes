//Chapter 2: Syntax

/*Reminder!  -> 
Declaration -> Declaring the type of variable
Initialization -> Assignment of value to a variable
*/

//Function Block-Scoped Declarations
var a = 2;

(function IIFE(){
		var a = 3;
		console.log(a);	//3
})();

console.log(a);			//2


//let Declarations
var a = 2;

{
	let a = 3;
	console.log(a);	//3
}

console.log(a);		//2


// Implicit nature of let Declarations
let a = 2;

if (a > 1) {
		let b = a * 3;
		console.log(b);		//6

		for (let i = a; i <= b; i++) {
				let j = i + 10;
				console.log(j);
        }	// 12 13 14 15 16
 		
		let c = a + b;
		console.log(c);		//8
}


{
	console.log( a );	// undefined
    console.log( b );	// ReferenceError
/* Uncaught ReferenceError: Cannot access 'b' before 
initialization. -> This ReferenceError is a Temporal Dead Zone (TDZ)
Error.  You're accessing a variable that's been declared but not
yet initialized. */

	var a;
	let b;
}


/* let declarations should all be at the top of their scope. That 
totally avoids the accidental errors of accessing too early. */

{
	// `a` is not declared
	if (typeof a === "undefined") {
		console.log( "cool" );
	}

	// `b` is declared, but in its TDZ
	if (typeof b === "undefined") {		// ReferenceError!
		// ..
	}

	// ..

	let b;
}


// const Declarations
/* const creates constant value. Const is a variable that's read-only
after its initial value is set. Const should be used as a tool for 
signaling intent that these variables will not be changed. */

{	
	const a = 2;
	console.log(a);	//2

    a = 3;	//Uncaught TypeError: Assignment to constant variable.
}



{
	const a = [1,2,3];
	a.push(4);
    console.log(a);	//[1,2,3,4]
    /*  the "a" variable doesn't hold a constant array - it holds
        a constant reference to the array. The array itself is 
        freely mutable */
	a = 42;	//TypeError!
}


//Default Parameter Values

function foo(x,y) {
    x = x || 11; //11 is default value if x is Null
    y = y || 31; //31 is default value if y is Null

    console.log(x + y);
}

foo();		 	//42 -> Because 11 + 31 since no params given
foo(5, 6);	 	//11 -> Because 5 + 6 since 5 & 6 given
foo(5);		 	//36 -> Because 5 + 31 (no y given)
foo(null, 6);	//17 -> Because 11 + 6 (null x given)

foo(0, 42);     /*53 -> Because 11 + 42 (Since 0 is falsy -> we go to
                        default x param of 11) */



//Template Literals

//Old ES5 Way
var name = "Kyle";
	var greeting = "Hello " + name + "!";

console.log(greeting);			//"Hello Kyle!"
console.log(typeof greeting); 	//"string"

//New ES6 Way
var name = "Kyle";
	var greeting = `Hello ${name}!`;

console.log(greeting);			//"Hello Kyle!"
console.log(typeof greeting); 	//"string"



//Arrow Functions

//Old ES5 Way
function foo(x, y) {
    return x + y;
}

//New ES6 Way
var foo = (x,y) => x + y; 

var f1 = () => 12;
var f2 = x => x * 2;
var f3 = (x,y) => {
		var z = x * 2 + y;
		y++;
		x *= 3;
		return (x + y + z) / 2;
};

//Chapter 3: Organization

//Modules -> ES6 Way

//Exporting APIs

function foo(){}
var awesome = 42;
var bar = [1,2,3];

export {foo, awesome, bar};



function foo(){}
function bar(){}
function baz(){}
export {foo as default, bar, baz};


//Importing APIs
import {foo, bar, baz} from "foo";


//Chapter 4: Async Flow Control

/* As JavaScript continues to mature and grow in its widespread adoption,
asynchronous programming is more and more of a central concern. Callbacks
are not fully sufficient for these tasks, and totally fall down the more 
sophisticated the need. Thankfully, ES6 adds Promises to address one of 
the major shortcomings of callbacks: lack of trust in predictable behavior.
Promises represent the future completion value from a potentially async 
task, normalizing behavior across sync and async boundaries. */


//Chapter 7: Meta Programming 
/* Meta Programming -> Programming where the operation 
targets the behavior of the program itself */