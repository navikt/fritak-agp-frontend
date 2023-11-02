import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

import { toHaveNoViolations } from 'jest-axe';

// Extend the functionality to support axe
expect.extend(toHaveNoViolations);
