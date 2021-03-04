import formatDokumentasjon from './formatDokumentasjon';

describe('formatDokumentasjon', () => {
  it('should format true', () => {
    expect(formatDokumentasjon(true)).toEqual('Dokumentasjon vedlagt: ja');
  });

  it('should format false', () => {
    expect(formatDokumentasjon(false)).toBe('Dokumentasjon vedlagt: nei');
  });
});
