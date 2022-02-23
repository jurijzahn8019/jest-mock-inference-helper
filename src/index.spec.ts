import { asClassMock } from "./asClassMock";
import { asMock } from "./asMock";
import { asMocks } from "./asMocks";
import { fooBar } from "./__fixtures__/bar";
import { FooClass, fooFunc, fooFunc1 } from "./__fixtures__/foo";

jest.mock("./__fixtures__/foo");

describe("exports", () => {
  it("Shoudl export", () => {
    return expect(import("./index")).resolves.toMatchInlineSnapshot(`
              Object {
                "asClassMock": [Function],
                "asMock": [Function],
                "asMocks": [Function],
                "fromPartial": [Function],
                "withParamsPartial": [Function],
              }
            `);
  });
});

describe("asMock", () => {
  const fooFuncMock = asMock(fooFunc).mockReturnValue("fooMock");

  it("Should cast function", () => {
    expect(fooBar()).toEqual("fooMock");
    expect(fooFuncMock).toHaveBeenCalled();
  });
});

describe("asMocks", () => {
  const { fooFunc1Mock, fooFuncMock } = asMocks({ fooFunc, fooFunc1 });
  beforeEach(() => {
    fooFuncMock.mockReturnValue("foo");
    fooFunc1Mock.mockReturnValue("foo1");
  });

  it("Should mock and map functions", () => {
    expect(fooFunc()).toEqual("foo");
    expect(fooFunc1()).toEqual("foo1");
  });
});

describe("asClassmock", () => {
  it("Should use default options", () => {
    const FooClassMock = asClassMock(FooClass);
    const fooClass = new FooClass();

    // ? This will fail since inner object is not automocked
    expect(() => fooClass.innerObject.theFoo()).toThrowError();

    // ? This wiil work since outer fileds are automocked
    expect(() => fooClass.outerFoo()).not.toThrow();

    // This is Same
    expect(FooClassMock.constructor).toHaveBeenCalled();
    // as
    expect(FooClass).toHaveBeenCalled();

    // ? this is not automocked by default
    expect(FooClassMock.innerObject).toBeUndefined();

    // this is automocked
    expect(FooClassMock.outerFoo).toHaveBeenCalled();
  });

  it("Shoudl use map options", () => {
    const FooClassMock = asClassMock(FooClass, {
      innerObject: { theFoo: true },
    });

    const fooClass = new FooClass();

    // ? This will success since inner object is mocked by the helper now
    expect(() => fooClass.innerObject.theFoo()).not.toThrowError();

    // Default implementation
    expect(fooClass.innerObject.theFoo()).toBeUndefined();
    expect(FooClassMock.innerObject.theFoo).toHaveBeenCalled();
  });

  it("Shoudl use provided mocks", () => {
    const FooClassMock = asClassMock(FooClass, {
      innerObject: {
        // Provide mock implementation for inner prop
        theFoo: jest.fn().mockReturnValue("inner Foo"),

        // Advanced usage usefull for mocking properties
        innerProp: (o, p) =>
          Object.defineProperty(o, p, {
            get: jest.fn().mockReturnValue("innerPropFoo"),
          }),

        // just for coverage here :)
        theBar: undefined,
      },
    });

    const fooClass = new FooClass();

    // ? This will success since inner object is mocked by the helper now
    expect(() => fooClass.innerObject.theFoo()).not.toThrowError();

    // Provided mock implementation is used
    expect(fooClass.innerObject.theFoo()).toEqual("inner Foo");
    expect(FooClassMock.innerObject.theFoo).toHaveBeenCalled();

    // Mocked getter
    expect(fooClass.innerObject.innerProp).toEqual("innerPropFoo");
  });
});
