import React from 'react';
import Oversettelse from '../Oversettelse/Oversettelse';
import { useTranslation } from 'react-i18next';
import { DuplicateSubmissionAdvarselKeys } from './DuplicateSubmissionAdvarselKeys';
import { Alert, Heading, Link, Modal } from '@navikt/ds-react';

interface DuplicateSubmissionAdvarselProps {
  onClose: () => void;
  isOpen?: boolean;
}

const DuplicateSubmissionAdvarsel = (props: DuplicateSubmissionAdvarselProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={props.isOpen}
      onClose={() => props.onClose()}
      className='server-feil-advarsel'
      aria-labelledby='modal-heading-duplicate-submission'
    >
      <Modal.Body>
        <Alert variant='info' className='server-feil-advarsel--innhold'>
          <Heading spacing level='2' size='medium' id='modal-heading-duplicate-'>
            {t(DuplicateSubmissionAdvarselKeys.DUPLICATE_SUBMISSION_ADVARSEL_HEADING)}
          </Heading>
          <div>
            <Oversettelse langKey={DuplicateSubmissionAdvarselKeys.DUPLICATE_SUBMISSION_ADVARSEL_TEXT} />
          </div>
          <br />
          <div>
            <Link onClick={() => props.onClose()}>
              {t(DuplicateSubmissionAdvarselKeys.DUPLICATE_SUBMISSION_ADVARSEL_HIDE)}
            </Link>
          </div>
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

export default DuplicateSubmissionAdvarsel;
