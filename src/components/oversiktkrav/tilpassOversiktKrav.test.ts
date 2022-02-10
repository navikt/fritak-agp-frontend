import mockKravliste from '../../mockData/mockKravliste';
import tilpassOversiktKrav from './tilpassOversiktKrav';

describe('tilpassOversiktKrav', () => {
  it('shold return a list of krav', () => {
    const expected = [
      {
        fnr: '10107400090',
        kravId: '1bf2489d-6868-4068-bed6-23c179370cd9',
        navn: 'ARTIG HEST',
        kravtype: 'gravidKrav',
        opprettet: new Date('2021-11-23T09:31:43.841Z')
      },
      {
        fnr: '10107400090',
        kravId: '2dec96d1-916b-4317-9f9c-610e8b8747ed',
        navn: 'ARTIG HEST',
        kravtype: 'gravidKrav',
        opprettet: new Date('2021-11-08T08:54:11.230Z')
      },
      {
        fnr: '10107400090',
        kravId: '1bf2489d-6868-4068-bed6-23c179370cd9',
        kravtype: 'kroniskKrav',
        navn: 'ARTIG HEST',
        opprettet: new Date('2021-11-23T09:31:43.841Z')
      },
      {
        fnr: '10107400090',
        kravId: '2dec96d1-916b-4317-9f9c-610e8b8747ed',
        kravtype: 'kroniskKrav',
        navn: 'ARTIG HEST',
        opprettet: new Date('2021-11-08T08:54:11.230Z')
      }
    ];

    expect(tilpassOversiktKrav(mockKravliste)).toEqual(expected);
  });
});
