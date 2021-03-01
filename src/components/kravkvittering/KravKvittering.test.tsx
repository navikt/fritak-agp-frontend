import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KravKvittering from './KravKvittering';
import { mockApp } from '../../mockData/mockApp';

describe('KravKvittering', () => {
  it('skal vise melding om at det kommer noe etterhvert', () => {
    const { container } = render(mockApp(<KravKvittering />));
    expect(container).toContainHTML('kronisk-kvittering');
  });

  it('should have no a11y violations', async () => {
    const { container } = render(mockApp(<KravKvittering />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
