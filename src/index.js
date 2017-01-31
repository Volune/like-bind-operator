const OPERATOR = Symbol('like-bind-operator');

// eslint-disable-next-line no-extend-native
Object.defineProperty(Object.prototype, OPERATOR, {
  configurable: false,
  enumerable: false,
  writable: false,
  value: function likeBindOperator(param) {
    let fn = param;
    if (typeof fn !== 'function') {
      fn = this[param];
    }
    if (typeof fn !== 'function') {
      throw new Error('Invalid parameter to bind operator');
    }
    const that = this;
    return Object.defineProperties(function boundFunction() {
      // eslint-disable-next-line prefer-rest-params
      return fn.apply(that, arguments);
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
