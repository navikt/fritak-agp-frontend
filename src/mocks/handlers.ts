import { http, HttpResponse } from 'msw';

const arbeidsgiverResponse = [
  { navn: 'ANSTENDIG BJØRN KOMMUNE', underenheter: [], orgnr: '810007672' },
  {
    navn: 'ANSTENDIG PIGGSVIN BYDEL',
    orgnr: '810007702',
    underenheter: [
      {
        navn: 'ANSTENDIG PIGGSVIN BRANNVESEN',
        underenheter: [],
        orgnr: '810008032'
      },
      {
        navn: 'ANSTENDIG PIGGSVIN BARNEHAGE',
        underenheter: [],
        orgnr: '810007842'
      },
      {
        navn: 'ANSTENDIG PIGGSVIN SYKEHJEM',
        underenheter: [],
        orgnr: '810007982'
      }
    ]
  },
  { navn: 'SKOPPUM OG SANDØY', underenheter: [], orgnr: '911206722' },
  {
    navn: 'SKJERSTAD OG KJØRSVIKBUGEN',
    underenheter: [],
    orgnr: '911212218'
  }
];

const notifikasjonGravidKrav = {
  id: 1234,
  opprettet: '2020-01-01T12:00:00',
  sendtAv: 'Test Testesen',
  virksomhetsnummer: '974652277',
  identitetsnummer: '25087327879',
  perioder: [
    {
      fom: '2020-01-01',
      tom: '2020-01-31',
      antallDagerMedRefusjon: 4,
      belop: 1000
    },
    {
      fom: '2020-02-01',
      tom: '2020-02-28',
      antallDagerMedRefusjon: 4,
      belop: 1000
    }
  ],
  harVedlegg: false,
  antallDager: 4,
  journalpostId: '123456-789',
  oppgaveId: '475757-8383-18181818',
  virksomhetsnavn: 'Virksomhetsnavn'
};

export const handlers = [
  http.get('/fritak-agp/api/v1/arbeidsgiver-tilganger', () => {
    return HttpResponse.json(arbeidsgiverResponse);
  }),

  http.get('/fritak-agp/api/v1/arbeidsgivere', () => {
    return HttpResponse.json(arbeidsgiverResponse);
  }),

  // http.post('/fritak-agp/api/v1/gravid/krav', () => {
  //   return HttpResponse.text('Unauthorized', { status: 409 });
  // }),

  http.get('/fritak-agp/api/v1/gravid/krav/:id', () => {
    return HttpResponse.json(notifikasjonGravidKrav);
  }),

  http.post('/fritak-agp/api/v1/kronisk/krav', () => {
    return HttpResponse.text('OK', { status: 200 });
  }),

  http.post('/fritak-agp/api/v1/gravid/soeknad', () => {
    return HttpResponse.text('OK', { status: 200 });
  }),

  http.post('/fritak-agp/api/v1/gravid/krav', () => {
    return HttpResponse.text('OK', { status: 200 });
  }),

  http.post('/fritak-agp/api/v1/kronisk/soeknad', () => {
    return HttpResponse.text('OK', { status: 200 });
  })
];
