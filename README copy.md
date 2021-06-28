# jest-mock-inference-helper

[![Build Status](https://travis-ci.org/jurijzahn8019/jest-mock-inference-helper.svg?branch=main)](https://travis-ci.org/jurijzahn8019/jest-mock-inference-helper)
[![Coverage Status](https://coveralls.io/repos/github/jurijzahn8019/jest-mock-inference-helper/badge.svg?branch=main)](https://coveralls.io/github/jurijzahn8019/jest-mock-inference-helper?branch=main)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=jurijzahn8019/jest-mock-inference-helper)](https://app.dependabot.com/accounts/jurijzahn8019/repos/204479322)
[![GitHub](https://img.shields.io/github/license/jurijzahn8019/jest-mock-inference-helper)](LICENSE)
[![npm](https://img.shields.io/npm/v/@jurijzahn8019/jest-mock-inference-helper)](https://www.npmjs.com/package/@jurijzahn8019/jest-mock-inference-helper)
[![Vulnerabilities](https://snyk.io/test/github/jurijzahn8019/jest-mock-inference-helper/badge.svg)](https://snyk.io/test/github/jurijzahn8019/jest-mock-inference-helper)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@jurijzahn8019/jest-mock-inference-helper)](https://bundlephobia.com/result?p=@jurijzahn8019/jest-mock-inference-helper)
[![GitHub last commit](https://img.shields.io/github/last-commit/jurijzahn8019/jest-mock-inference-helper)](https://github.com/jurijzahn8019/jest-mock-inference-helper/commits/main)

simple libraray for jest-tested projects to create jest mock for js aws-sdk .promise() calls

## WHY

i was tired to copy-paste my mock helpers across repos

## install

```bash
npm i -D @jurijzahn8019/jest-mock-inference-helper
```

## usage

in your code file

```typescript
export function foo() {
  return new SecretsManager().getSecretValue({ SecretId: "bar-baz" }).promise();
}
```

in your spec file

```typescript
import { SecretsManager } from "aws-sdk";
import { on } from "@jurijzahn8019/jest-mock-inference-helper";
import { foo } from "./code.ts";

jest.mock("aws-sdk");

describe("aws-mock", () => {
  it("Should succeed", async () => {
    const m = on(SecretsManager)
      .mock("getSecretValue")
      .resolve({ SecretString: "foo-bar" });

    const res = foo();

    await expect(res).resolves.toMatchSnapshot("Result");
    expect(m.mock).toHaveBeenCalledTimes(1);
  });

  it("Should fail", async () => {
    const m = on(SecretsManager).mock("getSecretValue").reject("foo-baz");

    const res = foo();

    await expect(res).rejects.toMatchSnapshot("Result");
    expect(m.mock).toHaveBeenCalledTimes(1);
  });
});
```

chain mocks

```typescript
import { SecretsManager } from "aws-sdk";
import { on } from "@jurijzahn8019/jest-mock-inference-helper";
import { foo } from "./code.ts";

jest.mock("aws-sdk");

describe("aws-mock", () => {
  it("Should succeed", async () => {
    const m = on(SecretsManager)
      .mock("getSecretValue")
      .resolveOnce({ SecretString: "foo-bar" })
      .resolveOnce({ SecretString: "baz-bar" })
      .rejectOnce({ SecretString: "baz-bar" });

    const res = foo();

    await expect(res).resolves.toMatchSnapshot("Result 1");
    await expect(res).resolves.toMatchSnapshot("Result 2");
    await expect(res).rejects.toMatchSnapshot("Error");

    expect(m.mock).toHaveBeenCalledTimes(3);
  });
});
```

## Changelog

[Changelog](CHANGELOG.md).

## License

[MIT Lizenz](https://choosealicense.com/licenses/mit/)
