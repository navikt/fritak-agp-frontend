import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';

// Extend the functionality to support axe
expect.extend(toHaveNoViolations);
