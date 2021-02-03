import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';
import Modal from 'react-modal';

// Extend the functionality to support axe
expect.extend(toHaveNoViolations);
Modal.setAppElement('*'); // suppresses modal-related test warnings.
