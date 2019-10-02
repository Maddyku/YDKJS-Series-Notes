//Chapter 1: Asynchrony: Now & Later

/* AJAX = Asynchronous JavaScript and XML. AJAX is a technique for 
creating fast and dynamic web pages. Allows for updating 
parts of a web page without reloading the entire page */

// ajax(..) is some arbitrary AJAX function given by a library
var data = ajax("http://some.url.1");

console.log(data);
/* Oops! data generally won't have the Ajax results
VM30731:4 Uncaught ReferenceError: ajax is not defined
    at <anonymous>:4:12 */



// ajax(..) is some arbitrary AJAX function given by a library
ajax("http://some.url.1", function myCallbackFunction(data){
		console.log(data);
});



function now() { //now() function runs first
    return 21;
}

function later() {  /* later() function runs asynchronously
    after 1 second from setTimeout */

    answer = answer * 2;
    console.log("Meaning of life:", answer);
}

var answer = now();

setTimeout(later, 1000);	//Meaning of life: 42
// VM31143:7 Meaning of life: 42



// Event Loop
/* The JS engine doesn't run in isolation. It runs inside a hosting 
environment, which is for most developers the typical web browser.
Over the last several years (but by no means exclusively), JS has
expanded beyond the browser into other environments, such as servers,
via things like Node.js. In fact, JavaScript gets embedded into all
kinds of devices these days, from robots to lightbulbs.

So, for example, when your JS program makes an Ajax request to fetch 
some data from a server, you set up the "response" code in a function
(commonly called a "callback"), and the JS engine tells the hosting
environment, "Hey, I'm going to suspend execution for now, but whenever
you finish with that network request, and you have some data, please
call this function back." 

As you can see, there's a continuously running loop represented by the
while loop, and each iteration of this loop is called a "tick." For 
each tick, if an event is waiting on the queue, it's taken off and 
executed. These events are your function callbacks.

It's important to note that setTimeout(..) doesn't put your callback on
the event loop queue. What it does is set up a timer; when the timer
expires, the environment places your callback into the event loop,
such that some future tick will pick it up and execute it. */


//Concurrency
/* Concurrency is when two or more chains of events interleave over 
time, such that from a high-level perspective, they appear to be
running simultaneously (even though at any given moment only one
event is being processed). */



//Chapter 2: Callbacks


//Callback
/* the function is acting as a "callback," because it serves as the
target for the event loop to "call back into" the program, whenever
that item in the queue is processed.

As you no doubt have observed, callbacks are by far the most common
way that asynchrony in JS programs is expressed and managed. Indeed,
the callback is the most fundamental async pattern in the language. */

    //Callback Hell

    /* But the brittle nature of manually hardcoded callbacks (even with
    hardcoded error handling) is often far less graceful. Once you end up
    specifying (aka pre-planning) all the various eventualities/paths, the
    code becomes so convoluted that it's hard to ever maintain or update it.

    That is what "callback hell" is all about! The nesting/indentation
    are basically a side show, a red herring.*/


//Building Internal Functions with Defensive checks against input params

function addNumbers(x, y) {
    // ensure numerical input
    if (typeof x != "number" || typeof y != "number") {
            throw Error("Bad parameters");
    }
    //if we get here will safely do numeric addition
    return x + y;
}

addNumbers(21, 21);		//42
addNumbers(21, "21");	//Error: "Bad Parameters"


// using "error-first style" callback design
function foo(err,data) {
	if (err) {
		console.error( err );
	}
	else {
		console.log( data );
	}
}

ajax( "http://some.url.1", timeoutify( foo, 500 ) );



//Chapter 3: Promises


function add(xPromise, yPromise) {
    return Promise.all([xPromise, yPromise])

    .then(function(values){
        return values[0] + values[1];
    });
}

add(fetchX(), fetchY())
.then(	
    // fulfillment handler
    function(sum){
        console.log(sum);
    },
    // rejection handler
    function(err) {
        console.error(err); //bummer!
    }
);



function foo(x) {
    /* start doing something that could take a while
       and return an event listener notification */
    
    return listener;
}

var evt = foo(42);

evt.on("completion", function(){
    // now we can do the next step!
});

bar(evt);   //let bar() listen to foo() completion

baz(evt);   //let baz() listen to foo() completion

evt.on("failure", function(err){
    //oops, something wen't wrong in foo()
});


/* Promise is an object representing eventual completion or failure of 
an asynchronous operation */


function foo(x) {
        //start doing something that could take a while

        //construct and return a promise
        return new Promise(function(resolve, reject) {
            /* eventually call resolve() or reject() -> which 
               are both the resolution callbacks for the promise */
        });
}

var p = foo(42);
bar(p);
baz(p);


function bar(fooPromise) {
    // listen for foo() to complete
    foo.Promise.then(
        function() {
            // foo() has now finished so do bar()s task
        },
        function(){
            // oops something went wrong in foo()
        }
    );
}
// ditto for baz()

//ES6 Promise.resolve

Promise.resolve(p)
.then(
        function fulfilled(val){
            console.log(val);   //42
        },
        function rejected(err){
            // never gets here
        }
);



var p = Promise.resolve(21);
p.then(function(v){
       console.log(v);  //21

       //create a promise and return it
       return new Promise(function(resolve, reject){
            //introduce asynchrony!
            setTimeout(function(){
                //fulfull with value 42
                resolve(v * 2);
            }, 100);
        });
})
.then(function(v){
        //runs after the 100ms delay in the previous step
      console.log(v); //42
});


// assume an ajax({url}, {callback}) utility

//Promise-aware ajax
function request(url) {
        return new Promise( function(resolve, reject){
            /* the ajax() callback should be our 
               promise's resolve() function */
            ajax(url, resolve);
        });
}

//Terminology: Resolve, Fulfill, & Reject
var p = new Promise(function(X,Y){
        //X() for fulfillment
        //Y() for rejection
});


var p = Promise.resolve(42);

p.then(
        function fulfilled(msg){
            //numbers don't have string functions so will throw an error
            console.log(msg.toLowerCase());
        }
)
.done(null, handleErrors);


// new Promise() Constructor

var p = new Promise( function(resolve, reject){
        // resolve() to resolve/fulfill the promise
        // reject() to reject the promise
});



//Chapter 4: Generators (Using Complete Guide to Modern JS for this ch. 4)
//Async Await 
function walk(amount) {
    return new Promise((resolve, reject) => {
        if (amount < 500) {
            reject("the value is too small");
        }
        setTimeout(() => resolve(`you walked for ${amount}ms`), amount);
    });
}

//create an async function
async function go() {   /* use keyword async to tell JS to return a promise
                    Promise is an object representing eventual
                    completion or failure of an asynchronous operation 
                    use the keyboard await to wait for the response */
    const res = await walk(500);
    console.log(res);
    const res2 = await walk(900);
    console.log(res2); 
    const res3 = await walk(400);
    console.log(res3);
}

go();

// you walked for 500ms
// you walked for 900ms
// uncaught exception: the value is too small


// Generators
/* A generator function is a function that we can start and stop, for an
indefinite amount of time, and restart with the possibility of passing 
additional data at a later point in time. */