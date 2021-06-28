/* eslint-disable @typescript-eslint/no-explicit-any */
type AsMockProto<
  T extends Record<string, any>,
  K extends string & keyof T = keyof T & string
> = {
  [P in K]: AsMockField<T[P]>;
};

type AsMockField<T> = T extends (...args: any) => any
  ? jest.MockedFunction<T>
  : AsMockProto<T>;

type AsMockConfig<
  T extends Record<string, any>,
  K extends keyof T = keyof T
> = {
  [P in Exclude<K, "toString">]?: AsMockFieldConfig<T[P], T>;
};
type AsMockFieldConfig<T, P = any> = T extends (...args: any) => any
  ? boolean | jest.MockedFunction<T>
  : T extends Record<string, any>
  ? AsMockConfig<T>
  : (parent: P, p: string) => void;

type AsMockClass<Type extends jest.Constructable & { prototype: any }> = {
  constructor: jest.MockedClass<Type>;
} & AsMockProto<Type["prototype"]>;

function mapProtoMocks<Proto extends Record<string, any>>(
  proto: Proto,
  mocks: AsMockConfig<Proto>
): AsMockProto<Proto> {
  const res = proto as Record<string, any>;
  Object.entries(mocks).forEach(([k, v]) => {
    if (typeof v === "boolean" && v === true) {
      res[k] = jest.fn();
    } else if (typeof v === "function" && !v.mock) {
      v(res, k);
    } else if (typeof v === "function" && !!v.mock) {
      res[k] = v;
    } else if (typeof v === "object") {
      res[k] = mapProtoMocks(res[k] || {}, v);
    }
  });
  return res as never;
}

/**
 * This function is used to infer type of the Mocked Class as Object
 * Structure of automocked functions. Additionally a top-level property
 * named `constructor` will hold the constructor mock instance
 *
 * @template Type
 * @param type
 * @param options the options object will control how the mocked class is processed
 * @returns class mock
 */
export function asClassMock<
  Type extends jest.Constructable & { prototype: any }
>(type: Type, options?: AsMockConfig<Type["prototype"]>): AsMockClass<Type> {
  return {
    constructor: type as jest.MockedClass<Type>,
    ...mapProtoMocks(type.prototype, options || {}),
  } as any;
}
