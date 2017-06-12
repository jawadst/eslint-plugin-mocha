'use strict';

module.exports = function (context) {
    var possibleAsyncFunctionNames = [
        'it',
        'it.only',
        'test',
        'test.only',
        'specify',
        'specify.only',
        'before',
        'after',
        'beforeEach',
        'afterEach'
    ];

    function getCalleeName(callee) {
        if (callee.type === 'MemberExpression') {
             return callee.object.name + '.' + callee.property.name;
        }

        return callee.name;
    }

    function hasParentMochaFunctionCall(functionExpression) {
        var name;

        if (functionExpression.parent && functionExpression.parent.type === 'CallExpression') {
            name = getCalleeName(functionExpression.parent.callee);
            return possibleAsyncFunctionNames.indexOf(name) > -1;
        }

        return false;
    }

    function isAsyncFunction(functionExpression) {
        return functionExpression.async === true;
    }

    function check(node) {
        if (hasParentMochaFunctionCall(node) && !isAsyncFunction(node)) {
            context.report(node, 'Unexpected non-async function.');
        }
    }

    return {
        FunctionExpression: check,
        ArrowFunctionExpression: check
    };
};
