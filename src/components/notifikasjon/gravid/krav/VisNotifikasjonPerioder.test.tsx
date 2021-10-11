import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import VisNotifikasjonPerioder from './VisNotifikasjonPerioder';

import KravPeriode from '../../../../api/gravidkrav/KravPeriode';

describe('VisNotifikasjonPerioder', () => {
  it('should show one row', async () => {
    const mockPerioder: KravPeriode[] = [
      {
        fom: '2020-02-03',
        tom: '2020-04-05',
        antallDagerMedRefusjon: 7,
        belop: 123
      }
    ];

    render(<VisNotifikasjonPerioder perioder={mockPerioder} />);

    expect(screen.getByText(/03.02.20 - 05.04.20/)).toBeInTheDocument();
  });

  it('should show two rows', async () => {
    const mockPerioder: KravPeriode[] = [
      {
        fom: '2020-02-03',
        tom: '2020-04-05',
        antallDagerMedRefusjon: 7,
        belop: 123
      },
      {
        fom: '2020-05-06',
        tom: '2020-07-08',
        antallDagerMedRefusjon: 8,
        belop: 345
      }
    ];

    render(<VisNotifikasjonPerioder perioder={mockPerioder} />);

    expect(screen.getByText(/03.02.20 - 05.04.20/)).toBeInTheDocument();
    expect(screen.getByText(/06.05.20 - 08.07.20/)).toBeInTheDocument();
  });

  it('should have no a11y violations', async () => {
    const mockPerioder: KravPeriode[] = [
      {
        fom: '2020-02-03',
        tom: '2020-04-05',
        antallDagerMedRefusjon: 7,
        belop: 123
      },
      {
        fom: '2020-05-06',
        tom: '2020-07-08',
        antallDagerMedRefusjon: 8,
        belop: 345
      }
    ];

    const { container } = render(<VisNotifikasjonPerioder perioder={mockPerioder} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
