import postKroniskKrav from './postKroniskKrav';

import KroniskKravRequest from './KroniskKravRequest';

jest.mock('../postRequest');

import postRequest from '../postRequest';

describe('postKroniskKrav', () => {
  const params: KroniskKravRequest = {
    identitetsnummer: 'string',
    virksomhetsnummer: 'string',
    perioder: [
      {
        fom: 'string',
        tom: 'string',
        antallDagerMedRefusjon: 5,
        beloep: 3
      }
    ],
    bekreftet: true,
    kontrollDager: 123
  };
  it('should call postRequest with the correct params', () => {
    postKroniskKrav('/basepath', params);

    expect(postRequest).toHaveBeenCalledWith('/basepath/api/v1/kronisk/krav', params);
  });
});
