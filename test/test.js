/* eslint-env mocha */
import expect from 'must';
import Δ from '../src/index';

const SOME_ARG = { isSomeArg: true };
const SOME_RESULT = { isSomeResult: true };

const SOME_SYMBOL = Symbol('someSymbol');
const SOME_UNKNOWN_SYMBOL = Symbol('someUnknownSymbol');

describe('like-bind-operator', () => {
  let calledFunctionToBind = false;
  let calledWithThis = null;
  let calledWithArguments = [];

  function functionToBind(...args) {
    calledFunctionToBind = true;
    calledWithThis = this;
    calledWithArguments = args;
    return SOME_RESULT;
  }

  const checkAvailableExpectations = (value, boundFunction) => {
    const result = boundFunction(SOME_ARG);
    expect(calledFunctionToBind).to.be.true();
    if (Number.isNaN(value)) {
      expect(calledWithThis).to.be.nan();
    } else {
      expect(calledWithThis).to.equal(value);
    }
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
    expect(result).to.equal(SOME_RESULT);
  };

  const testAvailableOn = (value, param) => {
    const boundFunction = value[Δ](param);
    checkAvailableExpectations(value, boundFunction);
  };

  const testNotAvailableOn = (invalidValue, param) => {
    expect(() => {
      invalidValue[Δ](param)(SOME_ARG);
    }).to.throw();
  };

  beforeEach(() => {
    calledFunctionToBind = false;
    calledWithThis = null;
    calledWithArguments = [];
  });

  it('available on object (empty)', () => testAvailableOn({}, functionToBind));

  it('available on object', () => testAvailableOn({ A: 1 }, functionToBind));

  it('available on array (empty)', () => testAvailableOn([], functionToBind));

  it('available on array', () => testAvailableOn([1], functionToBind));

  it('available on number (0)', () => testAvailableOn(0, functionToBind));

  it('available on number (1)', () => testAvailableOn(1, functionToBind));

  it('available on number (+Infinity)', () => testAvailableOn(+Infinity, functionToBind));

  it('available on number (NaN)', () => testAvailableOn(NaN, functionToBind));

  it('available on boolean (false)', () => testAvailableOn(false, functionToBind));

  it('available on boolean (true)', () => testAvailableOn(true, functionToBind));

  it('available on string (empty)', () => testAvailableOn('', functionToBind));

  it('available on string', () => testAvailableOn('string', functionToBind));

  it('available on function', () => testAvailableOn(() => undefined, functionToBind));

  it('keeps function name', () => {
    function myFunction() {
      // do nothing
    }

    const boundFunction = ({})[Δ](myFunction);
    expect(boundFunction).to.be.a.function();
    expect(boundFunction.name).to.equal('myFunction');
    expect(boundFunction.name).to.equal(myFunction.name);
  });

  it('keeps function displayName', () => {
    function myFunction() {
      // do nothing
    }

    const boundFunction = ({})[Δ](myFunction);
    expect(boundFunction).to.be.a.function();
    expect(boundFunction.displayName).to.equal(myFunction.displayName);
  });

  it('keeps function arguments length', () => {
    // eslint-disable-next-line no-unused-vars
    function myFunction(ignored1, ignored2) {
      // do nothing
    }

    const boundFunction = ({})[Δ](myFunction);
    expect(boundFunction).to.be.a.function();
    expect(boundFunction.length).to.equal(2);
    expect(boundFunction.length).to.equal(myFunction.length);
  });

  it('not available on undefined', () => testNotAvailableOn(undefined, functionToBind));

  it('not available on null', () => testNotAvailableOn(null, functionToBind));

  it('not available on object with empty prototype', () => testNotAvailableOn(Object.create(null), functionToBind));

  it('resolves property if given a string', () => testAvailableOn({ member: functionToBind }, 'member'));

  it('resolves property if given a number', () => testAvailableOn([functionToBind], 0));

  it('resolves property if given a symbol', () => testAvailableOn({ [SOME_SYMBOL]: functionToBind }, SOME_SYMBOL));

  const itWithProxy = typeof Proxy !== 'undefined' ? it : it.skip;

  itWithProxy('resolves property of object using proxy', () => {
    const value = { member: functionToBind };
    const boundFunction = value[Δ].member;
    checkAvailableExpectations(value, boundFunction);
  });

  itWithProxy('resolves property of array using proxy', () => {
    const value = [functionToBind];
    const boundFunction = value[Δ][0];
    checkAvailableExpectations(value, boundFunction);
  });

  itWithProxy('resolves property of string using proxy', () => {
    const value = 'test';
    const boundFunction = value[Δ].toUpperCase;
    const result = boundFunction();
    expect(result).to.equal(value.toUpperCase());
  });

  it('throws an exception if invalid property', () => testNotAvailableOn({}, SOME_UNKNOWN_SYMBOL));
});
