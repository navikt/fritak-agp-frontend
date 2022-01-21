import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KravKvittering from './KravKvittering';
import { mockApp } from '../../mockData/mockApp';
import lenker from '../../config/lenker';

describe('KravKvittering', () => {
  it('skal vise melding om at det kommer noe etterhvert', () => {
    const { container } = render(mockApp(<KravKvittering backTarget={lenker.GravidKrav} />));
    expect(container).toContainHTML('kronisk-kvittering');
  });

  it('should have no a11y violations', async () => {
    const { container } = render(mockApp(<KravKvittering backTarget={lenker.GravidKrav} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
