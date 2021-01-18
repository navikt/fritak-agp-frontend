import React, { ChangeEvent, useState } from 'react';
import { Feilmelding } from 'nav-frontend-typografi';
import './Upload.sass';
import { Flatknapp } from 'nav-frontend-knapper';

interface UploadProps {
  id: string;
  label: string;
  extensions: string;
  fileSize: number;
  onChange: (file?: File) => void;
  onDelete: () => void;
}

const Upload = (props: UploadProps) => {
  const [filnavn, setFilnavn] = useState<string>(props.label);
  const [feilmelding, setFeilmelding] = useState<string>('');
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > props.fileSize) {
        setFilnavn(props.label);
        setFeilmelding('Filen er for stor');
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
      <label className='knapp filknapp'>
        <input
          className='fileinput'
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
          <b className='fileupload-delete'>Lastet opp: </b>
          {filnavn}
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
