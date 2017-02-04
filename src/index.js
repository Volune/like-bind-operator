const OPERATOR = Symbol('like-bind-operator');
const THIS = Symbol('this');

function bindOperator(param) {
  let fn = param;
  if (typeof fn !== 'function') {
    fn = this[param];
  }
  if (typeof fn !== 'function') {
    throw new Error('Invalid parameter to bind operator');
  }
  return Object.defineProperties((...args) => fn.apply(this, args), {
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
}

if (typeof Proxy !== 'undefined') {
  const proxyHandler = {
    get(target, key) {
      const that = target[THIS];
      return bindOperator.call(that, that[key]);
    },
  };
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Object.prototype, OPERATOR, {
    configurable: false,
    enumerable: false,
    get() {
      const target = bindOperator.bind(this);
      target[THIS] = this;
      const boundOperator = new Proxy(target, proxyHandler);
      if (typeof this === 'object' || typeof this === 'function') {
        // eslint-disable-next-line no-extend-native
        Object.defineProperty(this, OPERATOR, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: boundOperator,
        });
      }
      return boundOperator;
    },
  });
} else {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Object.prototype, OPERATOR, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: bindOperator,
  });
}

export default OPERATOR;
