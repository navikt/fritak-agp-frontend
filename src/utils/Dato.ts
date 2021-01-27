const NORWAY_REGEX = new RegExp('^(\\d{1,2})\\.(\\d{1,2})\\.(\\d{4})$');

export interface Dato {
  value?: string;
  error?: string;
  year?: number;
  month?: number;
  day?: number;
}

export const datoToString = (dato: Dato): string => {
  if (!dato.year) {
    throw new Error('År ikke oppgitt');
  }
  if (!dato.month) {
    throw new Error('Måned ikke oppgitt');
  }
  if (!dato.day) {
    throw new Error('Dag ikke oppgitt');
  }
  return dato.year + '-' + (dato.month < 10 ? '0' : '') + dato.month + '-' + (dato.day < 10 ? '0' : '') + dato.day;
};

export const parseDato = (date: string): Dato => {
  if (!NORWAY_REGEX.test(date)) {
    return {
      value: date,
      error: 'Ugyldig dato format'
    };
  }
  const arr = date.split('.');
  const day = parseInt(arr[0]);
  const month = parseInt(arr[1]);
  const year = parseInt(arr[2]);
  if (day < 1) {
    return {
      value: date,
      error: 'Ugyldig dag'
    };
  }
  const v = new Date(year, month - 1, day);
  if (v.getDate() != day) {
    return {
      value: date,
      error: 'Ugyldig dato'
    };
  }
  if (v.getMonth() != month - 1) {
    return {
      value: date,
      error: 'Ugyldig måned'
    };
  }
  return {
    value: date,
    day,
    month,
    year
  };
};
