import mockKravliste from '../../mockData/mockKravliste';
import tilpassOversiktKrav from './tilpassOversiktKrav';
import timezone_mock from 'timezone-mock';

describe('tilpassOversiktKrav', () => {
  beforeEach(() => {
    timezone_mock.register('Europe/London');
  });
  it('shold return a list of krav', () => {
    const expected = [
      {
        fnr: '10107400090',
        kravId: '1bf2489d-6868-4068-bed6-23c179370cd9',
        navn: 'ARTIG HEST',
        kravtype: 'gravidKrav',
        opprettet: new Date('2021-11-23T10:31:43.841Z')
      },
      {
        fnr: '10107400090',
        kravId: '2dec96d1-916b-4317-9f9c-610e8b8747ed',
        navn: 'ARTIG HEST',
        kravtype: 'gravidKrav',
        opprettet: new Date('2021-11-08T09:54:11.230Z')
      },
      {
        fnr: '10107400090',
        kravId: '1bf2489d-6868-4068-bed6-23c179370cd9-unik',
        kravtype: 'kroniskKrav',
        navn: 'ARTIG HEST MED GANSKE LANGT NAVN',
        opprettet: new Date('2021-11-23T10:31:43.841Z')
      },
      {
        fnr: '10107400090',
        kravId: '2dec96d1-916b-4317-9f9c-610e8b8747ed-unik',
        kravtype: 'kroniskKrav',
        navn: 'ARTIG HEST MED FRYKTELIG LANGT OG RART NAVN',
        opprettet: new Date('2021-11-08T09:54:11.230Z')
      }
    ];

    expect(tilpassOversiktKrav(mockKravliste)).toEqual(expected);
  });
});
