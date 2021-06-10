import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import Slettknapp from './Slettknapp';

describe('Slettknapp', () => {
  it('should display the component and handle a button click', () => {
    const mockKnapp = jest.fn();
    const component = render(<Slettknapp onClick={mockKnapp}>Slett</Slettknapp>);

    const knappen = component.getByText(/Slett/);

    fireEvent.click(knappen);

    expect(mockKnapp).toHaveBeenCalled();
  });

  it('should have no a11y violations', async () => {
    const mockKnapp = jest.fn();
    const { container } = render(<Slettknapp onClick={mockKnapp}>Slett</Slettknapp>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
