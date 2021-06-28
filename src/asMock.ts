/**
 * Just casts given function into a jest mock
 * Usefull by using jest.mock("module") function
 */
/**
 * infers {@link jest.MockedFunction} from given input and casts given function
 * into it.
 *
 * @template Func
 * @param func the mocked function to cast into {@link jest.MockedFunction}
 * @returns function as mock
 *
 * @example
 *
 * @code
 *
 * ```typescript
 * import { asMock } from "@jurijzahn8019/jest-mock-inference-helper";
 * import { sut } from "./sut.ts";
 * import { func } from "./func.ts";
 *
 * // ? Automock dependency
 * jest.mock("./func.ts");
 *
 * // ? This is the same
 * const funcMock = asMock(func).mockReturnValue("foo")
 *
 * // ? as
 * const funcMock =
 *   (func as jest.MockedFuntion<typeof func>).mockReturnValue("foo");
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function asMock<Func extends (...args: any) => any>(
  func: Func
): jest.MockedFunction<Func> {
  return func as jest.MockedFunction<Func>;
}
