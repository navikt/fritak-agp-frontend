import { render, screen } from '@testing-library/react';
import Dokumentasjon from './Dokumentasjon';

describe('Dokumentasjon', () => {
  it('should format true', () => {
    render(<Dokumentasjon harVedlegg={true} />);
    expect(screen.getByText('Dokumentasjon vedlagt: ja')).toBeTruthy();
  });

  it('should format false', () => {
    render(<Dokumentasjon harVedlegg={false} />);
    expect(screen.getByText('Dokumentasjon vedlagt: nei')).toBeTruthy();
  });
});
