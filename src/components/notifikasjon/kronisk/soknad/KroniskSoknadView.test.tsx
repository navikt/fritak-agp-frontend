import { render, screen } from '@testing-library/react';
import React from 'react';
import KroniskSoknadView from './KroniskSoknadView';
import KroniskSoknadResponse from '../../../../api/kronisk/KroniskSoknadResponse';
import ArbeidType from '../../../kronisk/ArbeidType';
import PaakjenningerType from '../../../kronisk/PaakjenningerType';

describe('GravidSoknadView', () => {
  const notifikasjon = {
    virksomhetsnavn: 'Ola Normann',
    arbeidstyper: [ArbeidType.KREVENDE, ArbeidType.MODERAT, ArbeidType.STILLESITTENDE],
    paakjenningstyper: [
      PaakjenningerType.ALLERGENER,
      PaakjenningerType.GAAING,
      PaakjenningerType.HARDE,
      PaakjenningerType.REGELMESSIG,
      PaakjenningerType.STRESSENDE,
      PaakjenningerType.TUNGE,
      PaakjenningerType.UKOMFORTABEL,
      PaakjenningerType.ANNET
    ],
    paakjenningBeskrivelse: 'en liten beskrivelse',
    fravaer: [''],
    harVedlegg: true,
    sendtAv: 'Ole Normann'
  } as KroniskSoknadResponse;

  it('should show all fields', () => {
    render(<KroniskSoknadView kroniskSoknadResponse={notifikasjon} />);
    expect(screen.getByText(/Ola Normann/)).toBeInTheDocument();
    expect(screen.getByText(/krevende/)).toBeInTheDocument();
    expect(screen.getByText(/moderat/)).toBeInTheDocument();
    expect(screen.getByText(/stillesittende/)).toBeInTheDocument();

    expect(screen.getByText(/allergener/)).toBeInTheDocument();
    expect(screen.getByText(/gaaing/)).toBeInTheDocument();
    expect(screen.getByText(/harde/)).toBeInTheDocument();
    expect(screen.getByText(/regelmessig/)).toBeInTheDocument();
    expect(screen.getByText(/stressende/)).toBeInTheDocument();
    expect(screen.getByText(/tunge/)).toBeInTheDocument();
    expect(screen.getByText(/ukomfortabel/)).toBeInTheDocument();
    expect(screen.getByText(/annet/)).toBeInTheDocument();
    expect(screen.getByText(/en liten beskrivelse/)).toBeInTheDocument();

    expect(screen.getByText(/Dokumentasjon vedlagt/)).toBeInTheDocument();
    expect(screen.getByText(/Ole Normann/)).toBeInTheDocument();
  });
});
