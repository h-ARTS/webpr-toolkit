# **Lambda Calculus**

**Lambda rule**: tries to bind as much as possible to the right side

**α alpha**: Rename parameter

**β beta**: Apply argument - replace variables on the left side with expression form the right side. Start from the inside and go out

**η eta**: Cancel parameter

-----

### **Alpha Translation**
```js
const id = x => x
const id = y => y
```

### **Beta reduction**
```js
(f => x => f(x))(id)(1) // 1
(     x => id(x))(1)    // 2
(          id(1))       // 3
(x => x)(1)             // 4
1                       // 5
```

### **Eta reduction**
```js
x => y => plus(x)(y)
x =>      plus(x)
          plus
```

### **Combinators: lambda function**

> References from video. Source: [Fundamentals of Lambda Calculus](https://www.youtube.com/watch?v=3VQ382QG-y4)

- Idiot/ Identity: `I = x => x` with lambda `λa.a` for id
- Mockingbird: `M = f => f(f)` with lambda `λƒ.ƒƒ`
- Kestrel: `K = a => b => a` with lambda `λab.a` for `const`
- Kite: `KI = CK = a => b => b` with lambda `λab.b` for const id
- Cardinal: `C = f => a => b => f(b)(a)` with lambda `λƒab.ƒba` for flip

### **Boolean operations: lambda has no normal boolean**

- TRUE: `T = K = λab.a` with javascript `a => b => a`
- FALSE: `F = KI = λab.b` with javascript `a => b => b`
- Negation: `NOT = C = λp.pFT` with javascript `!p = p => p(F)(T)`
- Conjunction: `AND = λpq.pqF` / `λpq.pqp` with javascript `p && q = p => q => p(q)(F)` / `p => q => p(q)(p)`
- Disjunction: `OR = λpq.pTq` / `λpq.ppq` with javascript `p || q = p => q => p(T)(q)` / `p => q => p(p)(q)`
- Exclusive or: `XOR = M = λpq.p(qTF)(qFT)` with javascript `p XOR q = p => q => p(qTF)(qFT)`
- Boolean equality: `BEQ = λpq.pq(NOT q)` with javascript `p == q = p => q => p(q)(!q)`

### **Divers**:

- Pair: `PAIR = V = λabƒ.ƒab` with javascript `a => b => f => f(a)(b)`
- First: `FST = λp.pK` with javascript `p => p(K)`
- Second: `SND = λp.pKI` with javascript `n => p(KI)`
- Phi / Φ: `Φ = λp.V(SND p)(SUCC (SND p))` with javascript `p => PAIR(SND(p)(SUCC(SND(p))))`