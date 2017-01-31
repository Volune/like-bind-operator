import { defineOperator } from './index';

const OPERATOR = Symbol('callback-to-promise-operator');
const RETURNED_VALUE = Symbol('callback-to-promise-returned-value');
const THROWN_VALUE = Symbol('callback-to-promise-thrown-value');
const CALLBACK_ARGUMENTS = Symbol('callback-to-promise-callback-arguments');

defineOperator(OPERATOR, (that, fn) => (...args) => {
  let resolve;
  let reject;
  const promise = new Promise((resolveParam, rejectParam) => {
    resolve = resolveParam;
    reject = rejectParam;
  });
  try {
    promise[RETURNED_VALUE] = fn.call(that, ...args, (...callbackArgs) => {
      promise[CALLBACK_ARGUMENTS] = callbackArgs;
      if (callbackArgs[0]) {
        reject(callbackArgs[0]);
      } else {
        resolve(callbackArgs[1]);
      }
    });
  } catch (exception) {
    promise[THROWN_VALUE] = exception;
    reject(exception);
  }
  return promise;
});

export default OPERATOR;
export {
  CALLBACK_ARGUMENTS,
  RETURNED_VALUE,
  THROWN_VALUE,
};
