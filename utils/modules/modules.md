# **Modules**

Modules allows you to build large programs from small, reusable parts.
Some key take away from the lesson:

### **Implies defer**
JavaScript modules are deferred by default, meaning that the browser won't block HTML parsing to load and execute them. Instead, the module will be fetched in parallel with the HTML parsing, and it won't execute until after the HTML document has been completely parsed.

### **Strict mode**
JavaScript modules automatically enable strict mode, which is a way of opting in to a stricter variant of JavaScript that disallows some problematic or potentially confusing language features. For example, in strict mode, you can't use undeclared variables.
```js
myVar = "Hello world" // ReferenceError
```
### **Read-only**
Imported bindings are read-only. That means you cannot change the value of an imported variable, function, or object within the module that imports it.

### **No global object**
Variables declared in a module script are local to the module. They are not added to the global window object, unlike in traditional scripts. Unless you explicitly add it to the window object which is not recommended. --> See example in `utils/modules/index.html`

### **No global hoisting**
Variables in a module are not hoisted to the global scope, they are hoisted only within their own scope. This is also true for traditional scripts when using `let` or `const` instead of `var`:
```js
console.log(myVar); // undefined (variable is declared)

var myVar = 5;

console.log(myVar); // 5
```

```js
console.log(myLetVar); // ReferenceError: myLetVar is undefined

let myLetVar = 5;

console.log(myLetVar); // 5
```

### **Subject to same origin policy (SOP)**
Modules are subject to the same-origin policy, which means that a script trying to access a resource (like another script, or data returned by an API) must be on the same origin (scheme, hostname, and port) as the resource, unless the server serving the resource indicates with CORS headers that it can be accessed from other origins.
**Dev mode:** Bypass same-origin policy for better development experience