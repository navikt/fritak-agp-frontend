import React from 'react';
import { render, cleanup, screen, fireEvent, act } from '@testing-library/react';
import { axe } from 'jest-axe';

import SlettKravModal from './SlettKravModal';

describe('SlettKravModal', () => {
  it('should have no a11y violations', async () => {
    let container: Element;
    await act(async () => {
      ({ container } = render(
        <div className='kravside'>
          <SlettKravModal onOKClicked={vi.fn()} showSpinner={false} modalOpen={true} onClose={vi.fn()} />
        </div>
      ));
    });
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });

  it('should run the onClose function when "Nei" has been pressed', async () => {
    const onCloseMock = vi.fn();
    await act(async () => {
      render(
        <div className='kravside'>
          <SlettKravModal onOKClicked={vi.fn()} showSpinner={false} modalOpen={true} onClose={onCloseMock} />
        </div>
      );
    });

    const neiButton = screen.getByText(/Nei/);
    fireEvent.click(neiButton);

    expect(onCloseMock).toBeCalled();
  });

  it('should run the onOKClicked function when "Ja" has been pressed', async () => {
    const onCloseMock = vi.fn();
    const onOKClickedMock = vi.fn();

    await act(async () => {
      render(
        <div className='kravside'>
          <SlettKravModal onOKClicked={onOKClickedMock} showSpinner={false} modalOpen={true} onClose={onCloseMock} />
        </div>
      );
    });

    const button = screen.getByText(/Ja/);

    fireEvent.click(button);

    expect(onOKClickedMock).toHaveBeenCalled();
  });
});
