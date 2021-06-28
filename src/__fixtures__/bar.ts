import { FooClass, fooFunc } from "./foo";

export function fooBar(): string {
  return fooFunc();
}

export function fooClassBar(): string {
  const fooClass = new FooClass();
  return `${fooClass.innerObject.theFoo()} - ${fooClass.outerFoo()}`;
}
