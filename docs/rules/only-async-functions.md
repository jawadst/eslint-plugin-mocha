# Force Asynchronous Functions (only-async-functions)

When using async/await in a project, banning other methods of flow control improves readibility and maintainability. This rule warns against tests using non-async functions.

## Rule Details

This rule raises a warning if a non-async function is given to a test. Both synchronous and asynchronous tests (using a callback or returning a promise) will raise a warning.

The following patterns are considered problems:

```js
it('something', function () {
    ...
});

it('something', function (done) {
    ...
});
```

These patterns would not be considered problems:

```js
it('something', async function () {

});
```

### Caveats:

If a dynamic function is passed into the test call, it cannot be inspected because the function is only defined at runtime. Example that will pass and should not:

```js
var myTestFn = function(){
  // it cannot verify this
}
it('test name', myTestFn);
```

## When Not To Use It

* If you are primarily writing synchronous tests or asynchronous tests with callbacks or promises.

## Further Reading

* [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* [Asynchronous Code](http://mochajs.org/#asynchronous-code)
* [Working with Promises](http://mochajs.org/#working-with-promises)
