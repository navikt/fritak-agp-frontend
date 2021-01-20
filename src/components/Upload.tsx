import React, { ChangeEvent, useState } from 'react';
import { Feilmelding } from 'nav-frontend-typografi';
import './Upload.sass';
import { formatFilesize } from '../utils/formatFilesize';

interface UploadProps {
  id: string;
  label: string;
  extensions: string;
  fileSize?: number;
  onChange: (file?: File) => void;
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
  return (
    <div>
      <label className='knapp filknapp'>
        <input
          className='fileinput'
          type='file'
          id='fileUploader'
          accept={props.extensions}
          onChange={handleUpload}
          onClick={(e: any) => (e.target.value = null)}
        />
        {filnavn}
      </label>
      {feilmelding && <Feilmelding>{feilmelding}</Feilmelding>}
    </div>
  );
};

export default Upload;
