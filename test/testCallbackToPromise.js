/* eslint-env mocha */
import expect from 'must';
import Ψ, { CALLBACK_ARGUMENTS, RETURNED_VALUE, THROWN_VALUE } from '../src/callbackToPromise';

const FUNC = 'property';

const SOME_ARG = { isSomeArg: true };
const SOME_CALLBACK_ARGS = [null, 1, 2, 3];
const SOME_RETURNED_VALUE = { isSomeReturnedValue: true };
const SOME_THROWN_EXCEPTION = { isSomeThrownException: true };
const SOME_RESULT = { isSomeResult: true };
const SOME_ERROR = { isSomeError: true };

describe('callback-to-promise-operator', () => {
  it('resolves on sync callback result', () => {
    const object = {
      [FUNC](callback) {
        callback(null, SOME_RESULT);
      },
    };
    const promise = object[Ψ](FUNC)();
    expect(promise).to.be.a(Promise);
    return expect(promise).to.resolve.to.equal(SOME_RESULT);
  });

  it('resolves on async callback result', () => {
    const object = {
      [FUNC](callback) {
        setTimeout(() => callback(null, SOME_RESULT), 0);
      },
    };
    const promise = object[Ψ](FUNC)();
    expect(promise).to.be.a(Promise);
    return expect(promise).to.resolve.to.equal(SOME_RESULT);
  });

  it('rejects on thrown exception', () => {
    const object = {
      [FUNC]() {
        throw SOME_THROWN_EXCEPTION;
      },
    };
    const promise = object[Ψ](FUNC)();
    expect(promise).to.be.a(Promise);
    return expect(promise).to.reject.to.equal(SOME_THROWN_EXCEPTION);
  });


  it('rejects on sync callback error', () => {
    const object = {
      [FUNC](callback) {
        callback(SOME_ERROR);
      },
    };
    const promise = object[Ψ](FUNC)();
    expect(promise).to.be.a(Promise);
    return expect(promise).to.reject.to.equal(SOME_ERROR);
  });

  it('rejects on async callback error', () => {
    const object = {
      [FUNC](callback) {
        setTimeout(() => callback(SOME_ERROR), 0);
      },
    };
    const promise = object[Ψ](FUNC)();
    expect(promise).to.be.a(Promise);
    return expect(promise).to.reject.to.equal(SOME_ERROR);
  });

  it('passes arguments', () => {
    const object = {
      [FUNC](arg, callback) {
        expect(arg).to.equal(SOME_ARG);
        expect(callback).to.be.a.function();
        callback(null, true);
      },
    };
    const promise = object[Ψ](FUNC)(SOME_ARG);
    expect(promise).to.be.a(Promise);
    return expect(promise).to.resolve.to.be.true();
  });

  it('exposes callback arguments', () => {
    const object = {
      [FUNC](callback) {
        callback(...SOME_CALLBACK_ARGS);
      },
    };
    const promise = object[Ψ](FUNC)();
    expect(promise).to.be.a(Promise);
    return expect(promise).to.resolve.to.equal(SOME_CALLBACK_ARGS[1])
      .then(() => {
        expect(promise[CALLBACK_ARGUMENTS]).to.eql(SOME_CALLBACK_ARGS);
      });
  });

  it('exposes returned value', () => {
    const object = {
      [FUNC](callback) {
        callback(null, true);
        return SOME_RETURNED_VALUE;
      },
    };
    const promise = object[Ψ](FUNC)();
    expect(promise).to.be.a(Promise);
    expect(promise[RETURNED_VALUE]).to.equal(SOME_RETURNED_VALUE);
    return expect(promise).to.resolve.to.be.true();
  });

  it('exposes thrown exception', () => {
    const object = {
      [FUNC](callback) {
        callback(null, true);
        throw SOME_THROWN_EXCEPTION;
      },
    };
    const promise = object[Ψ](FUNC)();
    expect(promise).to.be.a(Promise);
    expect(promise[THROWN_VALUE]).to.equal(SOME_THROWN_EXCEPTION);
    return expect(promise).to.resolve.to.be.true();
  });
});
