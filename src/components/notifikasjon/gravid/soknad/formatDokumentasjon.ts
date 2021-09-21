const formatDokumentasjon = (harVedlegg: boolean | undefined) =>
  'Dokumentasjon vedlagt: ' + (harVedlegg ? 'ja' : 'nei');

export default formatDokumentasjon;
