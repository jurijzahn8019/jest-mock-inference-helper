import { fromPartial, withParamsPartial } from "./utils";

describe("fromPartial", () => {
  it("Shoudl just passthrough", () => {
    expect(
      fromPartial<{ foo: { bar: string; baz: number } }>({
        foo: { bar: "thestring" },
      })
    ).toEqual({
      foo: { bar: "thestring" },
    });
  });
});

describe("withParamsPartial", () => {
  it("Shoudl just passthrough", () => {
    expect(
      withParamsPartial((param: { some: string; foo: number }) => param)({
        some: "thefoo",
      })
    ).toEqual({ some: "thefoo" });
  });
});
