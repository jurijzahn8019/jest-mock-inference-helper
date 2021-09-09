export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

/**
 * Wraps the value containing only the part of required type
 * Usefull if only a subset of type must be passed to the SUT
 * @param value
 * @returns
 */
export function fromPartial<T>(value: DeepPartial<T>): T {
  return value as T;
}
