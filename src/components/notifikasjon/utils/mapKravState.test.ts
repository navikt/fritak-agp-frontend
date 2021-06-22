import GravidKravResponse from '../../../api/gravidkrav/GravidKravResponse';
import KroniskKravResponse from '../../../api/gravidkrav/KroniskKravResponse';
import mapKravState from './mapKravState';

describe('mapKravState', () => {
  it('shold convert the thing correctly', () => {
    const input: KroniskKravResponse = {
      id: 'f68a073b-9bed-45c1-aa1a-4dad2de52c2e',
      opprettet: '2021-03-02T12:50:50.400688',
      sendtAv: '10107400090',
      virksomhetsnummer: '810007842',
      identitetsnummer: '22018520056',
      perioder: [
        {
          fom: '2021-03-01',
          tom: '2021-03-10',
          antallDagerMedRefusjon: 2,
          beloep: 1234.0
        }
      ],
      harVedlegg: false,
      antallDager: null,
      journalpostId: '493346012',
      oppgaveId: null,
      virksomhetsnavn: 'Ukjent arbeidsgiver'
    };

    const expected: GravidKravResponse = {
      harVedlegg: false,
      id: 'f68a073b-9bed-45c1-aa1a-4dad2de52c2e',
      identitetsnummer: '22018520056',
      journalpostId: '493346012',
      antallDager: null,
      oppgaveId: null,
      opprettet: '2021-03-02T12:50:50.400688',
      periode: {
        antallDagerMedRefusjon: 2,
        beloep: 1234,
        fom: '2021-03-01',
        tom: '2021-03-10'
      },
      sendtAv: '10107400090',
      virksomhetsnavn: 'Ukjent arbeidsgiver',
      virksomhetsnummer: '810007842'
    };

    expect(mapKravState(input)).toEqual(expected);
  });

  it('shold convert the thing with two perioder correctly', () => {
    const input: KroniskKravResponse = {
      id: 'f68a073b-9bed-45c1-aa1a-4dad2de52c2e',
      opprettet: '2021-03-02T12:50:50.400688',
      sendtAv: '10107400090',
      virksomhetsnummer: '810007842',
      identitetsnummer: '22018520056',
      perioder: [
        {
          fom: '2021-03-01',
          tom: '2021-03-10',
          antallDagerMedRefusjon: 2,
          beloep: 1234.0
        },
        {
          fom: '2021-04-01',
          tom: '2021-04-10',
          antallDagerMedRefusjon: 3,
          beloep: 1234.0
        }
      ],
      harVedlegg: false,
      antallDager: null,
      journalpostId: '493346012',
      oppgaveId: null,
      virksomhetsnavn: 'Ukjent arbeidsgiver'
    };

    const expected: GravidKravResponse = {
      harVedlegg: false,
      id: 'f68a073b-9bed-45c1-aa1a-4dad2de52c2e',
      identitetsnummer: '22018520056',
      journalpostId: '493346012',
      antallDager: null,
      oppgaveId: null,
      opprettet: '2021-03-02T12:50:50.400688',
      periode: {
        antallDagerMedRefusjon: 5,
        beloep: 2468,
        fom: '2021-03-01',
        tom: '2021-04-10'
      },
      sendtAv: '10107400090',
      virksomhetsnavn: 'Ukjent arbeidsgiver',
      virksomhetsnummer: '810007842'
    };

    expect(mapKravState(input)).toEqual(expected);
  });

  it('shold convert the thing with four perioder correctly', () => {
    const input: KroniskKravResponse = {
      id: 'f68a073b-9bed-45c1-aa1a-4dad2de52c2e',
      opprettet: '2021-03-02T12:50:50.400688',
      sendtAv: '10107400090',
      virksomhetsnummer: '810007842',
      identitetsnummer: '22018520056',
      perioder: [
        {
          fom: '2021-03-01',
          tom: '2021-03-10',
          antallDagerMedRefusjon: 2,
          beloep: 1234.0
        },
        {
          fom: '2021-02-01',
          tom: '2021-02-10',
          antallDagerMedRefusjon: 2,
          beloep: 1234.0
        },
        {
          fom: '2021-05-01',
          tom: '2021-05-10',
          antallDagerMedRefusjon: 4,
          beloep: 1234.0
        },
        {
          fom: '2021-04-01',
          tom: '2021-04-10',
          antallDagerMedRefusjon: 1,
          beloep: 1234.0
        }
      ],
      harVedlegg: false,
      antallDager: null,
      journalpostId: '493346012',
      oppgaveId: null,
      virksomhetsnavn: 'Ukjent arbeidsgiver'
    };

    const expected: GravidKravResponse = {
      harVedlegg: false,
      id: 'f68a073b-9bed-45c1-aa1a-4dad2de52c2e',
      identitetsnummer: '22018520056',
      journalpostId: '493346012',
      antallDager: null,
      oppgaveId: null,
      opprettet: '2021-03-02T12:50:50.400688',
      periode: {
        antallDagerMedRefusjon: 9,
        beloep: 4936,
        fom: '2021-02-01',
        tom: '2021-05-10'
      },
      sendtAv: '10107400090',
      virksomhetsnavn: 'Ukjent arbeidsgiver',
      virksomhetsnummer: '810007842'
    };

    expect(mapKravState(input)).toEqual(expected);
  });
});
