# Like Bind-Operator

[![npm version](https://badge.fury.io/js/like-bind-operator.svg)](https://badge.fury.io/js/like-bind-operator) [![Build Status](https://travis-ci.org/Volune/like-bind-operator.svg?branch=master)](https://travis-ci.org/Volune/like-bind-operator)

This library is meant to provide an alternative to the [This-Binding Syntax](https://github.com/tc39/proposal-bind-operator) compatible with ES6.

It tries to provide a *short*, *readable* syntax to bind functions. It gets even better if the environment supports `Proxy`.

*Note*: It will not work if the value to bind is `undefined`, `null` or an object without prototype (for example `Object.create(null)`).

## Examples

```javascript
// Use whatever variable name that you like for the operator
import $ from 'like-bind-operator';

function logThis() {
  console.log(this);
}

const object = {};
const array = [];
const number = 1;
const boolean = true;
const func = () => 1;

object[$](logThis)();
array[$](logThis)();
number[$](logThis)();
boolean[$](logThis)();
func[$](logThis)();


// Can also resolve properties
const objectWithProperty = {
  objectFunc() { return 1; },
};
const arrayWithElement = [ () => 1 ];

objectWithProperty[$]('objectFunc')();
arrayWithElement[$](0)();

// With Proxy
objectWithProperty[$].objectFunc();
arrayWithElement[$][0]();
```
