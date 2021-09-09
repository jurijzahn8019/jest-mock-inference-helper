import { fromPartial } from "./utils";

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
