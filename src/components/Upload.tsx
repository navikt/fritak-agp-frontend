import React, {ChangeEvent, useState} from 'react';
import {Feilmelding} from 'nav-frontend-typografi';
import './Upload.sass';

interface UploadProps {
  id: string
  label: string
  extensions: string
  fileSize: number
  onChange: (file?: File) => void
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
  }
  return (
    <div>
      <label className="knapp filknapp">
        <input className="fileinput"
               type="file"
               id="fileUploader"
               accept={props.extensions}
               onChange={handleUpload}
               onClick={(e: any) => e.target.value = null} />
        {filnavn}
      </label>
      {feilmelding &&
        <Feilmelding>{feilmelding}</Feilmelding>
      }
    </div>
  );
}

export default Upload;
