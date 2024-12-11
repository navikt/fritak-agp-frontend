import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Upload from './Upload';
import { vi } from 'vitest';
import { useTranslation } from 'react-i18next';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('Upload', () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation;
    const tSpy = vi.fn((str) => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    });
  });

  it('skal nekte for store filer', () => {
    const bigFile = {
      size: 260000,
      name: 'big.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } as unknown as File;

    const handleChange = vi.fn();
    const handleDelete = vi.fn();

    const view = render(
      <Upload
        onChange={handleChange}
        onDelete={handleDelete}
        fileSize={2000}
        extensions='.pdf'
        id='fil_id'
        label='Filnavn'
      />
    );

    const uploadButton = view.getByLabelText(/Filnavn/);
    userEvent.upload(uploadButton, bigFile);

    expect(view.queryByText('tooLarge.xlsx')).not.toBeInTheDocument();
  });

  it('skal godta små filer', () => {
    const smallFile = {
      size: 260000,
      name: 'small.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } as unknown as File;

    const handleChange = vi.fn();
    const handleDelete = vi.fn();

    const view = render(
      <Upload
        onChange={handleChange}
        onDelete={handleDelete}
        fileSize={2000}
        extensions='.pdf'
        id='fil_id'
        label='Filnavn'
      />
    );

    const uploadButton = view.getByLabelText(/Filnavn/);
    userEvent.upload(uploadButton, smallFile);

    expect(view.queryByText('tooLarge.xlsx')).not.toBeInTheDocument();
  });
});
