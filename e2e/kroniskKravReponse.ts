import kroniskSoknadResponse from './kroniskSoknadResponse';

const kroniskKravResponse = {
  id: 'b386b006-4cdc-424c-9c74-481d3a63ccb7',
  opprettet: '2021-09-21T10:20:49.794895',
  sendtAv: '10107400090',
  virksomhetsnummer: '810007842',
  identitetsnummer: '10107400090',
  perioder: [
    {
      fom: '2021-09-01',
      tom: '2021-09-11',
      antallDagerMedRefusjon: 1,
      månedsinntekt: 1234.0,
      gradering: 1.0,
      dagsats: 56.95,
      belop: 56.95
    }
  ],
  harVedlegg: false,
  kontrollDager: null,
  antallDager: 260,
  journalpostId: null,
  oppgaveId: null,
  virksomhetsnavn: null,
  sendtAvNavn: 'ARTIG HEST'
};

export default kroniskSoknadResponse;
