export function fooFunc(): string {
  return "fooFunc";
}

export function fooFunc1(): string {
  return "fooFunc1";
}

export class FooClass {
  innerObject = {
    theBar: "",
    theFoo(): string {
      return "FooClass.innerObject.theFoo";
    },
    get innerProp(): string {
      return "getInner";
    },
    set innerProp(value: string) {
      /** */
    },
  };

  // eslint-disable-next-line class-methods-use-this
  outerFoo(): string {
    return "FooClass.outerFoo";
  }
}
