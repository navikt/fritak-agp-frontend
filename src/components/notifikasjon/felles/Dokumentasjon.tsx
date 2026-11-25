import React from 'react';

interface DokumentasjonProps {
  harVedlegg: boolean;
}

const Dokumentasjon = ({ harVedlegg }: DokumentasjonProps) => <>Dokumentasjon vedlagt: {harVedlegg ? 'ja' : 'nei'}</>;

export default Dokumentasjon;
