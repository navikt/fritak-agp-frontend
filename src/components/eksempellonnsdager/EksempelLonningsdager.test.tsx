import React from 'react';
import EksempelLonningsdager from './EksempelLonningsdager';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import LangKey from '../../locale/LangKey';

describe('EksempelLonningsdager', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<EksempelLonningsdager />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });

  it('skal vise eksempler', () => {
    render(<EksempelLonningsdager />);

    expect(screen.getByText('Turnus/rotasjon - for eksempel offshore')).toBeInTheDocument();
  });
});
