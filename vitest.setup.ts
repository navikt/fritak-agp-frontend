/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom/vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { expect, afterAll, afterEach, beforeAll } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import 'vitest-axe/extend-expect'; // Automatically extends Vitest's 'expect' types

expect.extend(jestDomMatchers);
expect.extend(axeMatchers);

// import { toHaveNoViolations } from 'vitest-axe/matchers';

// Extend the functionality to support axe
// expect.extend(toHaveNoViolations);

// Setup MSW for tests
import { server } from './src/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
