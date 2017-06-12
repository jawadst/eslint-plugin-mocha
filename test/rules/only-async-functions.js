'use strict';

var RuleTester = require('eslint').RuleTester,
    rules = require('../../').rules,
    ruleTester = new RuleTester();

ruleTester.run('only-async-functions', rules['only-async-functions'], {
    valid: [
        {
            code: 'it("", async function () { });',
            parserOptions: { ecmaVersion: 8 }
        },
        {
            code: 'it("", async function () { return true; });',
            parserOptions: { ecmaVersion: 8 }
        },
        {
            code: 'it("", async function (val) { return await new Promise((resolve) => { resolve(val); }); });',
            parserOptions: { ecmaVersion: 8 }
        },
        {
            code: 'var someFn = function(){ }; it("", someFn);',
            parserOptions: { ecmaVersion: 8 }
        },
        {
            code: 'before("", async function () { });',
            parserOptions: { ecmaVersion: 8 }
        },
        {
            code: 'beforeEach("", async function () { });',
            parserOptions: { ecmaVersion: 8 }
        },
        {
            code: 'after("", async function () { });',
            parserOptions: { ecmaVersion: 8 }
        },
        {
            code: 'afterEach("", async function () { });',
            parserOptions: { ecmaVersion: 8 }
        },
        {
            code: 'ignoredFunction(function () { });',
            parserOptions: { ecmaVersion: 8 }
        }
    ],

    invalid: [
        {
            code: 'it("", function () {});',
            errors: [ { message: 'Unexpected non-async function.', column: 8, line: 1 } ]
        },
        {
            code: 'it("", function () { callback(); });',
            errors: [ { message: 'Unexpected non-async function.', column: 8, line: 1 } ]
        },
        {
            code: 'it(function () { return; });',
            errors: [ { message: 'Unexpected non-async function.', column: 4, line: 1 } ]
        },
        {
            code: 'it("", function () { return "a string" });',
            errors: [ { message: 'Unexpected non-async function.', column: 8, line: 1 } ]
        },
        {
            code: 'it("", () => "not-a-promise" );',
            parserOptions: { ecmaVersion: 6 },
            errors: [ { message: 'Unexpected non-async function.', column: 8, line: 1 } ]
        },
        {
            code: 'specify("", function () {});',
            errors: [ { message: 'Unexpected non-async function.', column: 13, line: 1 } ]
        },
        {
            code: 'specify.only("", function () {});',
            errors: [ { message: 'Unexpected non-async function.', column: 18, line: 1 } ]
        },
        {
            code: 'it("", function () { return promise(); });',
            errors: [ { message: 'Unexpected non-async function.', column: 8, line: 1 } ]
        },
        {
            code: 'it("", function () { var promise = myFn(); return promise; });',
            errors: [ { message: 'Unexpected non-async function.', column: 8, line: 1 } ]
        },
        {
            code: 'test("", function (done) { done(); });',
            errors: [ { message: 'Unexpected non-async function.', column: 10, line: 1 } ]
        },
        {
            code: 'test.only("", function (done) { done(); });',
            errors: [ { message: 'Unexpected non-async function.', column: 15, line: 1 } ]
        },
        {
            code: 'before(function (done) { done(); });',
            errors: [ { message: 'Unexpected non-async function.', column: 8, line: 1 } ]
        },
        {
            code: 'after(function (done) { done(); });',
            errors: [ { message: 'Unexpected non-async function.', column: 7, line: 1 } ]
        },
        {
            code: 'beforeEach(function (done) { done(); });',
            errors: [ { message: 'Unexpected non-async function.', column: 12, line: 1 } ]
        },
        {
            code: 'afterEach(function (done) { done(); });',
            errors: [ { message: 'Unexpected non-async function.', column: 11, line: 1 } ]
        }
    ]
});
