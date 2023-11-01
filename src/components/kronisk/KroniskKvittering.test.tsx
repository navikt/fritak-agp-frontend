// import '@testing-library/vi-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KroniskKvittering from './KroniskKvittering';
import { mockApp } from '../../mockData/mockApp';

describe('KroniskKvittering', () => {
  it('skal vise melding om at det kommer noe etterhvert', () => {
    const { container } = render(mockApp(<KroniskKvittering />));
    expect(container).toContainHTML('kronisk-kvittering');
  });

  it('should have no a11y violations', async () => {
    const { container } = render(mockApp(<KroniskKvittering />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
