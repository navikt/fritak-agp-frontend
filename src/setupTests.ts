import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

// Extend the functionality to support axe
expect.extend(toHaveNoViolations);
