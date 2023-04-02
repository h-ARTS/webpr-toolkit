/**
 * @module ok_test - A way on how to test your code
 */

let ok = []

ok.push(snakeEquals(snake[0], { x: 10, y: 5 })) // will store either true/false

// test result report
if (ok.every((elem) => elem)) {
    document.writeln('All ' + ok.length + ' tests ok.')
} else {
    document.writeln('Not all tests ok! Details:')
    for (let i = 0; i < ok.length; i++) {
        if (ok[i]) {
            document.writeln('Test ' + i + ' ok')
        } else {
            document.writeln('Test ' + i + ' failed')
        }
    }
}
