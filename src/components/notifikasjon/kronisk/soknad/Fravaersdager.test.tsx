import { render, screen } from '@testing-library/react';
import React from 'react';

import Fravaersdager from './Fravaersdager';

const fravaer = [
  {
    yearMonth: '2020-09',
    antallDagerMedFravaer: 10
  },
  {
    yearMonth: '2019-11',
    antallDagerMedFravaer: 5
  },
  {
    yearMonth: '2020-11',
    antallDagerMedFravaer: 5
  },
  {
    yearMonth: '2020-12',
    antallDagerMedFravaer: 6
  },
  {
    yearMonth: '2020-06',
    antallDagerMedFravaer: 13
  },
  {
    yearMonth: '2021-01',
    antallDagerMedFravaer: 8
  },
  {
    yearMonth: '2020-01',
    antallDagerMedFravaer: 10
  },
  {
    yearMonth: '2021-02',
    antallDagerMedFravaer: 8
  },
  {
    yearMonth: '2021-03',
    antallDagerMedFravaer: 8
  },
  {
    yearMonth: '2021-04',
    antallDagerMedFravaer: 8
  },
  {
    yearMonth: '2021-05',
    antallDagerMedFravaer: 9
  },
  {
    yearMonth: '2021-07',
    antallDagerMedFravaer: 9
  },
  {
    yearMonth: '2021-08',
    antallDagerMedFravaer: 10
  },
  {
    yearMonth: '2019-09',
    antallDagerMedFravaer: 5
  },
  {
    yearMonth: '2021-09',
    antallDagerMedFravaer: 10
  },
  {
    yearMonth: '2020-02',
    antallDagerMedFravaer: 20
  }
];

describe('Fravaersdager', () => {
  it('should sum up the days', () => {
    render(<Fravaersdager maanedsfravaer={fravaer} />);

    expect(screen.getByText('Fraværsdager 2019: 10 dager, 2020: 64 dager, 2021: 70 dager')).toBeTruthy();
  });
});
