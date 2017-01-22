const OPERATOR = Symbol('like-bind-operator');

// eslint-disable-next-line no-extend-native
Object.defineProperty(Object.prototype, OPERATOR, {
  configurable: false,
  enumerable: false,
  writable: false,
  value: function likeBindOperator(fn) {
    const that = this;
    // eslint-disable-next-line func-names
    return Object.defineProperties(function () {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(that, arguments);
    }, {
      displayName: {
        configurable: true,
        enumerable: false,
        writable: false,
        value: fn.displayName,
      },
      name: {
        configurable: true,
        enumerable: false,
        writable: false,
        value: fn.name,
      },
      length: {
        configurable: true,
        enumerable: false,
        writable: false,
        value: fn.length,
      },
    });
  },
});

export default OPERATOR;
