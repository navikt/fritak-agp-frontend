import postKroniskKrav from './postKroniskKrav';

import KroniskKravRequest from './KroniskKravRequest';

jest.mock('../httpRequest');

import httpRequest from '../httpRequest';

describe('postKroniskKrav', () => {
  const params: KroniskKravRequest = {
    identitetsnummer: 'string',
    virksomhetsnummer: 'string',
    perioder: [
      {
        fom: 'string',
        tom: 'string',
        antallDagerMedRefusjon: 5,
        månedsinntekt: 1234,
        gradering: 1
      }
    ],
    bekreftet: true,
    antallDager: 123
  };
  it('should call httpRequest with the correct params', () => {
    postKroniskKrav('/basepath', params);

    expect(httpRequest).toHaveBeenCalledWith('/basepath/api/v1/kronisk/krav', params, 'POST');
  });
});
