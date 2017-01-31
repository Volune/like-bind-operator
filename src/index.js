const OPERATOR = Symbol('like-bind-operator');

const defineOperator = (operator, binder) => {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Object.prototype, operator, {
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
      return Object.defineProperties(binder(this, fn), {
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
};

defineOperator(OPERATOR, (that, fn) => (...args) => fn.apply(that, args));

export default OPERATOR;
export { defineOperator };
