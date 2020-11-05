import React from "react";
import {Label, SkjemaelementFeilmelding} from "nav-frontend-skjema";
import Flatpickr  from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import './DatoVelger.css';
import moment from "moment";


interface DatoVelgerProps {
  label: string
  dato?: Date
  feilmelding?: string,
  placeholder?: string
  onChange: (dato: Date) => void
}

const formatDato = (dato?: Date) => (dato ? moment(dato).format('DD.MM.YYYY') : '')

const DatoVelger = (props: DatoVelgerProps) => {
  const handleClose = (dato: Date) => {
    props.onChange(dato);
  }

  return (
    <div className={'skjemaelement'}>
      <Label htmlFor="datoId">{props.label}</Label>
      <Flatpickr
        id="datoId"
        placeholder={props.placeholder}
        className={'skjemaelement__input '}
        value={props.dato}

        options={{
          enableTime: false,
          dateFormat: 'd.m.Y',
          locale: Norwegian,
          allowInput: true,
          clickOpens: true,
          formatDate: formatDato,
          onClose: (selectedDate) => handleClose(selectedDate)
        }}
      />
      {props.feilmelding &&
        <SkjemaelementFeilmelding>{props.feilmelding}</SkjemaelementFeilmelding>
      }
    </div>
  )
}

export default DatoVelger;
