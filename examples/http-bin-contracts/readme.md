# https://httpbin.org/ typings example

Generate typings for a new endpoint with

`yarn new`

Test typings against fixtures

`yarn test`

Test typings against production

`yarn test-production`

## Usage

```ts
import { Response } from "http-bin/delay/{delay}/GET.v1.0";

const delayedRequest = async (delay: number): Response => {
  const response = fetch(`https://httpbin.org/delay/${delay}`);
  if (!response.ok) {
    throw new Error("failed");
  }
  return response.json();
};
```
