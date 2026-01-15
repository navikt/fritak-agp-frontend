import patchKroniskKrav from './patchKroniskKrav';

vi.mock('../httpRequest');

import httpRequest from '../httpRequest';

describe('patchKroniskKrav', () => {
  const payload = {
    identitetsnummer: '12345678901',
    virksomhetsnummer: '123456789',
    perioder: [
      {
        fom: '2024-01-01',
        tom: '2024-01-15',
        antallDagerMedRefusjon: 5,
        månedsinntekt: 50000,
        gradering: 100
      }
    ],
    bekreftet: true,
    antallDager: 10,
    aarsakEndring: 'TARIFFENDRING'
  };

  const kravId = 'abc-123-def';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call httpRequest with the correct params', () => {
    patchKroniskKrav('/basepath', kravId, payload);

    expect(httpRequest).toHaveBeenCalledWith('/basepath/api/v1/kronisk/krav/' + kravId, payload, 'PATCH');
  });

  it('should call httpRequest with correct URL for different kravId', () => {
    const differentKravId = 'xyz-789';

    patchKroniskKrav('/api', differentKravId, payload);

    expect(httpRequest).toHaveBeenCalledWith('/api/api/v1/kronisk/krav/' + differentKravId, payload, 'PATCH');
  });

  it('should handle payload without optional antallDager', () => {
    const payloadWithoutAntallDager = {
      identitetsnummer: '12345678901',
      virksomhetsnummer: '123456789',
      perioder: [
        {
          fom: '2024-01-01',
          tom: '2024-01-15',
          antallDagerMedRefusjon: 5,
          månedsinntekt: 50000
        }
      ],
      bekreftet: true,
      aarsakEndring: 'FEIL_INNTEKT'
    };

    patchKroniskKrav('/basepath', kravId, payloadWithoutAntallDager);

    expect(httpRequest).toHaveBeenCalledWith(
      '/basepath/api/v1/kronisk/krav/' + kravId,
      payloadWithoutAntallDager,
      'PATCH'
    );
  });

  it('should handle payload with multiple perioder', () => {
    const payloadWithMultiplePerioder = {
      identitetsnummer: '12345678901',
      virksomhetsnummer: '123456789',
      perioder: [
        {
          fom: '2024-01-01',
          tom: '2024-01-15',
          antallDagerMedRefusjon: 5,
          månedsinntekt: 50000,
          gradering: 100
        },
        {
          fom: '2024-02-01',
          tom: '2024-02-15',
          antallDagerMedRefusjon: 3,
          månedsinntekt: 55000,
          gradering: 50
        }
      ],
      bekreftet: true,
      antallDager: 8,
      aarsakEndring: 'ANNET'
    };

    patchKroniskKrav('/basepath', kravId, payloadWithMultiplePerioder);

    expect(httpRequest).toHaveBeenCalledWith(
      '/basepath/api/v1/kronisk/krav/' + kravId,
      payloadWithMultiplePerioder,
      'PATCH'
    );
  });
});
