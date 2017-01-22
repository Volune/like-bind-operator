/* eslint-env mocha */
import expect from 'must';
import Δ from '../src/index';

const SOME_ARG = { isSomeArg: true };

describe('like-bind-operator', () => {
  let called = false;
  let calledWithThis = null;
  let calledWithArguments = [];

  function functionToBind(...args) {
    called = true;
    calledWithThis = this;
    calledWithArguments = args;
  }

  beforeEach(() => {
    called = false;
    calledWithThis = null;
    calledWithArguments = [];
  });

  it('works on object (empty)', () => {
    const object = {};
    object[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(object);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on object', () => {
    const object = { A: 1 };
    object[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(object);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on array (empty)', () => {
    const array = [];
    array[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(array);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on array', () => {
    const array = [1];
    array[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(array);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on number (0)', () => {
    const number = 0;
    number[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(number);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on number (1)', () => {
    const number = 1;
    number[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(number);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on number (+Infinity)', () => {
    const number = +Infinity;
    number[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(number);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on number (NaN)', () => {
    const number = NaN;
    number[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.be.nan();
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on boolean (false)', () => {
    const boolean = false;
    boolean[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(boolean);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on boolean (true)', () => {
    const boolean = true;
    boolean[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(boolean);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on string (empty)', () => {
    const string = '';
    string[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(string);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on string', () => {
    const string = 'string';
    string[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(string);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

  it('works on function', () => {
    const func = () => undefined;
    func[Δ](functionToBind)(SOME_ARG);
    expect(called).to.be.true();
    expect(calledWithThis).to.equal(func);
    expect(calledWithArguments).to.have.length(1);
    expect(calledWithArguments[0]).to.equal(SOME_ARG);
  });

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

  it('fails with undefined', () => {
    expect(() => {
      const invalid = undefined;
      invalid[Δ](functionToBind)(SOME_ARG);
    }).to.throw();
  });

  it('fails with null', () => {
    expect(() => {
      const invalid = undefined;
      invalid[Δ](functionToBind)(SOME_ARG);
    }).to.throw();
  });

  it('fails with object with empty prototype', () => {
    expect(() => {
      const invalid = Object.create(null);
      invalid[Δ](functionToBind)(SOME_ARG);
    }).to.throw();
  });
});
