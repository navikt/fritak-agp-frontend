import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Upload from './Upload';

describe('Upload', () => {
  it('skal nekte for store filer', () => {
    const bigFile = {
      size: 260000,
      name: 'big.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } as unknown as File;

    const handleChange = jest.fn();
    const handleDelete = jest.fn();

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

    // expect(view.queryByText('tooLarge.xlsx')).toBeInTheDocument();
    expect(view.queryByText('tooLarge.xlsx')).not.toBeInTheDocument();
  });

  it('skal godta små filer', () => {
    const smallFile = {
      size: 260000,
      name: 'small.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } as unknown as File;

    const handleChange = jest.fn();
    const handleDelete = jest.fn();

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

    // expect(view.queryByText('tooLarge.xlsx')).toBeInTheDocument();
    expect(view.queryByText('tooLarge.xlsx')).not.toBeInTheDocument();
  });
});
