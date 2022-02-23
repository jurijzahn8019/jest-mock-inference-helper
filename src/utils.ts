/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Construct a type Possibly undefined from T
 */
export type Nullable<T> = T | undefined;

/**
 * Makes a Type deeply Partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Nullable<string | number | BigInt | boolean>
    ? T[P]
    : DeepPartial<T[P]>;
};

/**
 * Just a sugar expression
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * Wraps the value containing only the part of required type
 * Usefull if only a subset of type must be passed to the SUT
 * @param value
 * @returns
 */
export function fromPartial<T>(value: DeepPartial<T>): T {
  return value as T;
}

export type ParametersToDeepPartial<PP extends any[]> = [
  ...{ [P in keyof PP]: DeepPartial<PP[P]> }
];

export type FunctionWithParametersDeepPartial<F extends AnyFunction> = (
  ...args: ParametersToDeepPartial<Parameters<F>>
) => ReturnType<F>;

/**
 * Casts a given function into one that's all parameters are Partial
 * Very usefull for testing functions which takes big objects bunt inly use some fields of them
 *
 * @param func
 * @returns
 */
export function withParamsPartial<F extends AnyFunction>(
  func: F
): FunctionWithParametersDeepPartial<F> {
  return func;
}
