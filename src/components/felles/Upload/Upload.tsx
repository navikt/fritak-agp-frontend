import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadKeys } from './UploadKeys';
import { Button, ErrorMessage } from '@navikt/ds-react';
import './Upload.sass';

interface UploadProps {
  id: string;
  label: string;
  extensions: string;
  fileSize: number;
  className?: string;
  onChange: (file?: File) => void;
  onDelete: () => void;
}

const Upload = (props: UploadProps) => {
  const { t } = useTranslation();
  const [filnavn, setFilnavn] = useState<string>(props.label);
  const [feilmelding, setFeilmelding] = useState<string>('');
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > props.fileSize) {
        setFilnavn(props.label);
        setFeilmelding(t(UploadKeys.UPLOAD_TOO_BIG) as unknown as string);
      } else {
        setFilnavn(file.name);
        setFeilmelding('');
      }
      props.onChange(file);
    } else {
      props.onChange();
    }
  };
  const handleDelete = () => {
    setFilnavn(props.label);
    props.onDelete();
  };
  return (
    <div className={'upload ' + props.className}>
      <label className='navds-button navds-button--secondary upload-filknapp'>
        <input
          className='upload-fileinput'
          type='file'
          id='fileUploader'
          accept={props.extensions}
          onChange={handleUpload}
          onClick={(e: any) => (e.target.value = null)}
        />
        {props.label}
      </label>
      {filnavn !== props.label && (
        <div className='upload-deletewrapper'>
          <strong className='upload-delete'>{t(UploadKeys.UPLOAD_FILENAME)}</strong>
          <div className='upload-filnavn'>{filnavn}</div>
          <Button variant='tertiary' onKeyDown={handleDelete} onClick={handleDelete}>
            {t(UploadKeys.UPLOAD_DELETE)}
          </Button>
        </div>
      )}
      {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
    </div>
  );
};

export default Upload;
