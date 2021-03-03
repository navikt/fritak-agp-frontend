import getNotifikasjonUrl from './getNotifikasjonUrl';
import NotifikasjonType from './NotifikasjonType';

describe('getNotifikasjonUrl', () => {
  const UUID = 'kj5b23587hdjhb';

  it('should return correct Gravid Søknad', () => {
    expect(
      getNotifikasjonUrl(UUID, NotifikasjonType.GravidSoknad, 'http://localhost/api/v1/gravid/soeknad/kj5b23587hdjhb')
    );
  });
  it('should return correct Gravid Krav', () => {
    expect(getNotifikasjonUrl(UUID, NotifikasjonType.GravidKrav, 'http://localhost/api/v1/gravid/krav/kj5b23587hdjhb'));
  });

  it('should return correct Kronisk Søknad', () => {
    expect(
      getNotifikasjonUrl(UUID, NotifikasjonType.KroniskSoknad, 'http://localhost/api/v1/gravid/soeknad/kj5b23587hdjhb')
    );
  });
  it('should return correct Kronisk Krav', () => {
    expect(
      getNotifikasjonUrl(UUID, NotifikasjonType.KroniskKrav, 'http://localhost/api/v1/gravid/krav/kj5b23587hdjhb')
    );
  });
});
