# Trace

### Installation
```
npm install @wearejust/trace --save-dev
```

```
var trace = require('@wearejust/trace')
```

### trace()
Displays the arguments in a trace window in the top left of the screen.

```javascript
var n = 1;
trace(n); // Outputs "1"

var n = 1,
    m = 2,
    l = 3;
trace(n, m, l); // Outputs "1, 2, 3"

var a = [1, 2, 3];
trace(a); // Outputs "1, 2, 3"

var o = {
    a: 1,
    b: 2,
    c: 3
};
trace(o); // Outputs [object Object]

trace(); // Hides (and clears) the trace window
```


### trace.r()
Recursively traces arguments.

```javascript
var a = [1, 2, 3];
trace.r(a);
/* 
    Outputs:
    + [0] [object Array]
        - 0: 1
        - 1: 2
        - 2: 3
 */

var a = [1, 2, 3];
var b = [4, 5, 6];
trace.r(a, b);
/* 
    Outputs:
    + [0] [object Array]
        - 0: 1
        - 1: 2
        - 2: 3
    + [1] [object Array]
        - 0: 4
        - 1: 5
        - 2: 6
 */

var o = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: 4,
        f: 5,
        g: [6, 7, 8]
    }
};
trace.r(o);
/* 
    Outputs:
     + [0] [object Object]
         - a: 1
         - b: 2
         + [c] [object Object]
             - d: 3
             - e: 4
             - f: 5
             + [g] [object Array]
                 - 0: 6
                 - 1: 7
                 - 2: 8
 */
```


### trace.ms()
Display time between calls in miliseconds.

```javascript
trace.ms(); // Does nothing the first time
trace.ms(); // Outputs "[1] 100 ms"
trace.ms(); // Outputs "[2] 200 ms"
trace.ms(); // Outputs "[3] 300 ms"

trace.ms(150); // Add limit to display those that are over it in red
trace.ms(); // Outputs "[1] 100 ms"
trace.ms(); // Outputs "[2] 200 ms" with 200 in red
trace.ms(); // Outputs "[3] 300 ms" with 300 in red

trace.ms(true); // Resets the time
```