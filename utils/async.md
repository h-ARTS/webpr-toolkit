# **What is asynchronous programming in JS?**

### The premise of synchronous programming:
Synchronous programming in JavaScript is when code is executed in a sequential manner, where each line of code is executed one after the other, and the program waits for each operation to complete before moving on to the next operation. This means that if one operation takes a long time to complete, it will block the entire program and prevent any subsequent operations from being executed.

Example:
```js
console.log("Start");

function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {}
}

sleep(5000); // Sleep for 5 seconds

console.log("End");
```

### Asynchronous programming
Asynchronous programming in JavaScript is when code is executed in a non-sequential manner, where some operations may be executed later than others, depending on when they complete. This means that if one operation takes a long time to complete, it will not block the entire program, and other operations can be executed in the meantime.

Example:
```js
console.log("Start");

setTimeout(() => {
  console.log("Async task 1");
}, 1000);

setTimeout(() => {
  console.log("Async task 2");
}, 0);

console.log("End");

// output:
// Start
// End
// Async task 2
// Async task 1
```