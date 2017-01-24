/* eslint-env mocha */
import expect from 'must';
import Δ from '../src/index';

const SOME_ARG = { isSomeArg: true };
const SOME_RESULT = { isSomeResult: true };

describe('like-bind-operator', () => {
  let called = false;
  let calledWithThis = null;
  let calledWithArguments = [];

  function functionToBind(...args) {
    called = true;
    calledWithThis = this;
    calledWithArguments = args;
    return SOME_RESULT;
  }

  const testItWorksWith = (value) => {
    const result = value[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    if (Number.isNaN(value)) {
      expect(calledWithThis).to.be.nan();
    } else {
      expect(calledWithThis).to.equal(value);
    }
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
    expect(result).to.equal(SOME_RESULT);
  };

  const testItFailsWith = (invalidValue) => {
    expect(() => {
      invalidValue[Δ](functionToBind)(SOME_ARG);
    }).to.throw();
  };

  beforeEach(() => {
    called = false;
    calledWithThis = null;
    calledWithArguments = [];
  });

  it('works on object (empty)', () => testItWorksWith({}));

  it('works on object', () => testItWorksWith({ A: 1 }));

  it('works on array (empty)', () => testItWorksWith([]));

  it('works on array', () => testItWorksWith([1]));

  it('works on number (0)', () => testItWorksWith(0));

  it('works on number (1)', () => testItWorksWith(1));

  it('works on number (+Infinity)', () => testItWorksWith(+Infinity));

  it('works on number (NaN)', () => testItWorksWith(NaN));

  it('works on boolean (false)', () => testItWorksWith(false));

  it('works on boolean (true)', () => testItWorksWith(true));

  it('works on string (empty)', () => testItWorksWith(''));

  it('works on string', () => testItWorksWith('string'));

  it('works on function', () => testItWorksWith(() => undefined));

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

  it('fails with undefined', () => testItFailsWith(undefined));

  it('fails with null', () => testItFailsWith(null));

  it('fails with object with empty prototype', () => testItFailsWith(Object.create(null)));
});
