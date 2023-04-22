# **Understanding the 'this' Keyword**

## **Definition**

The `this` keyword in JavaScript is a special variable that's created for every function, every execution context. It refers to the context in which the function is called. This context can vary based on how the function is invoked.

## **Features of `this`**

1. **Global Context**: In the global execution context (outside of any function), `this` refers to the global object whether in strict mode or not. In a browser, `this` would refer to the `window` object.

```javascript
console.log(this); // Outputs: Window {...} (in a browser environment)
```

2. **Function Context**: In a function, the value of `this` depends on how the function is called.

```javascript
function myFunction() {
  console.log(this);
}

myFunction(); // Outputs: Window {...} (in a browser environment, non-strict mode)
```

In strict mode, `this` will be `undefined` if the function is called simply as `myFunction()`. This is because strict mode doesn't set `this` to the global object.

```javascript
"use strict";

function myFunction() {
  console.log(this);
}

myFunction(); // Outputs: undefined
```

3. **Object Method Context**: When a function is called as a method of an object, `this` is set to the object the method is called on.

```javascript
const myObject = {
  property: 'I am an object property.',
  myMethod: function() {
    console.log(this);
  }
};

myObject.myMethod(); // Outputs: myObject
```

4. **Event Handler Context**: In event handlers, `this` refers to the HTML element that received the event.

```javascript
button.addEventListener('click', function() {
  console.log(this); // Outputs: the HTML button element
});
```

5. **Constructor Function Context**: When a function is used as a constructor (with the `new` keyword), `this` is set to the newly created instance.

```javascript
function MyConstructor() {
  this.property = 'I am a property of the instance.';
}

const newInstance = new MyConstructor();
console.log(newInstance.property); // Outputs: 'I am a property of the instance.'
```

## **Pitfalls of `this`**

1. **Lost Context**: One common pitfall with `this` in JavaScript is losing context. This often happens when passing methods that use `this` as callbacks. Since the function gets invoked in a different context, `this` gets bound to that context instead of the original one.

```javascript
const myObject = {
  property: 'I am an object property.',
  myMethod: function() {
    console.log(this.property);
  }
};

const someFunction = function(callback) {
  callback();
};

someFunction(myObject.myMethod); // Outputs: undefined
```

In the example above, `this.property` is `undefined` because `this` is not `myObject` inside `someFunction`. To avoid this, you can use `Function.prototype.bind()`, `Function.prototype.call()`, or `Function.prototype.apply()` to explicitly set the value of `this`.

2. **Arrow Functions**: Arrow functions do not have their own `this`; they inherit `this` from the enclosing execution context. This can be both a pitfall and a feature, depending on the situation.

```javascript
const myObject = {
  property: 'I am an object property.',
  myMethod: () => {
    console.log(this.property);
  }
};

myObject.myMethod(); // Outputs: undefined (in non-strict mode, in a browser environment)
```

In the example above, `

`this.property` is `undefined` because `this` inside the arrow function `myMethod` refers to the global object, not `myObject`.

3. **Non-object `this`**: When a method is called on a non-object value (like a primitive), JavaScript will coerce the value to an object and `this` will refer to the temporary object. This can lead to unexpected results.

```javascript
function myFunction() {
  console.log(this);
}

myFunction.call(5); // Outputs: Number {5} (a Number object), not 5
```

In the example above, `this` is not the primitive number `5`, but a temporary `Number` object created from `5`.

## Tips to Manage 'this' in JavaScript

To manage and control what `this` refers to, you can use:

1. **Bind**: The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value.

```javascript
const boundMethod = myObject.myMethod.bind(myObject);
someFunction(boundMethod); // Outputs: 'I am an object property.'
```

2. **Call and Apply**: The `call()` and `apply()` methods call a function with a given `this` value and arguments provided individually (`call()`) or as an array (`apply()`).

```javascript
myObject.myMethod.call(myObject); // Outputs: 'I am an object property.'
```

3. **Arrow Functions**: In certain cases, using an arrow function can help maintain the context of `this` from the enclosing execution context. However, remember that arrow functions do not have their own `this`.

```javascript
const myObject = {
  property: 'I am an object property.',
  myMethod: function() {
    const arrowFunction = () => {
      console.log(this.property);
    };
    arrowFunction(); // Outputs: 'I am an object property.'
  }
};

myObject.myMethod();
```

Understanding and correctly using `this` in JavaScript can be challenging due to the different rules that apply in different contexts. It's important to be aware of these rules and the potential pitfalls to write effective and bug-free JavaScript code.

-----
Sources:
- [You Dont Know JS](https://github.com/getify/You-Dont-Know-JS)