import React, { ChangeEvent, useState } from 'react';
import { Feilmelding } from 'nav-frontend-typografi';
import './Upload.sass';
import { Flatknapp } from 'nav-frontend-knapper';
import { formatFilesize } from '../utils/formatFilesize';

interface UploadProps {
  id: string;
  label: string;
  extensions: string;
  fileSize?: number;
  onChange: (file?: File) => void;
  onDelete: () => void;
}

const Upload = (props: UploadProps) => {
  const [filnavn, setFilnavn] = useState<string>(props.label);
  const [feilmelding, setFeilmelding] = useState<string>('');
  const MAX_SIZE = props.fileSize || 1024 * 1000 * 10;
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > MAX_SIZE) {
        setFilnavn(props.label);
        setFeilmelding(
          'Filen er for stor. (Maks tillatt størrelse er ' +
            formatFilesize(MAX_SIZE) +
            ')'
        );
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
    <div>
      <label className='knapp upload-filknapp'>
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
        <>
          <b className='upload-delete'>Lastet opp: </b>
          <div className='upload-filnavn'>{filnavn}</div>
          <Flatknapp onKeyDown={handleDelete} onClick={handleDelete}>
            Slett
          </Flatknapp>
        </>
      )}
      {feilmelding && <Feilmelding>{feilmelding}</Feilmelding>}
    </div>
  );
};

export default Upload;
