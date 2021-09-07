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
    fravaer: [{}],
    harVedlegg: true,
    sendtAv: 'Ole Normann'
  } as KroniskSoknadResponse;

  it('should show all fields', () => {
    render(<KroniskSoknadView kroniskSoknadResponse={notifikasjon} />);
    expect(screen.getByText(/Ola Normann/)).toBeInTheDocument();
    expect(screen.getByText(/Fysisk krevende/)).toBeInTheDocument();
    expect(screen.getByText(/Moderat fysisk/)).toBeInTheDocument();
    expect(screen.getByText(/Stillesittende/)).toBeInTheDocument();

    expect(screen.getByText(/Allergener eller giftstoffer/)).toBeInTheDocument();
    expect(screen.getByText(/Mye gåing/)).toBeInTheDocument();
    expect(screen.getByText(/Harde gulv/)).toBeInTheDocument();
    expect(screen.getByText(/Regelmessige kveldsskift/)).toBeInTheDocument();
    expect(screen.getByText(/Stressende omgivelser/)).toBeInTheDocument();
    expect(screen.getByText(/Tunge løft/)).toBeInTheDocument();
    expect(screen.getByText(/Ukomfortabel temperatur/)).toBeInTheDocument();
    expect(screen.getByText(/Annet:/)).toBeInTheDocument();
    expect(screen.getByText(/en liten beskrivelse/)).toBeInTheDocument();

    expect(screen.getByText(/Dokumentasjon vedlagt/)).toBeInTheDocument();
    expect(screen.getByText(/Ole Normann/)).toBeInTheDocument();
  });
});
