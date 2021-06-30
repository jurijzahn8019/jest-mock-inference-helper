/* eslint-disable @typescript-eslint/no-explicit-any */
type StripMockSuffix<T> = T extends `${infer U}Mock` ? U : T;
type WithMockSuffix<T extends string> = `${T}Mock`;

type AsMocks<
  T extends Record<string, any>,
  K extends string & keyof T = keyof T & string
> = {
  [P in WithMockSuffix<K>]: jest.MockedFunction<T[StripMockSuffix<P>]>;
};

/**
 * takes an object with automocked functions, infers the type of {@link jest.MockedFunction}
 * for each of them and returns an object where every fild is suffixed with `Mock`
 * @param funcs
 * @returns
 */
export function asMocks<Funcs extends Record<string, any>>(
  funcs: Funcs
): AsMocks<Funcs> {
  const res = {} as Record<string, any>;
  Object.entries(funcs).forEach(([k, v]) => {
    res[`${k}Mock`] = v;
  });
  return res as any;
}
