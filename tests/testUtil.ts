import {
  test as base,
  expect,
} from "next/experimental/testmode/playwright/msw";
import type { MockServiceWorker } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";
import { handlers } from "../mocks/handlers";

const test = base.extend<{
  worker: MockServiceWorker;
}>({
  worker: createWorkerFixture(handlers),
});

export { expect, test };
