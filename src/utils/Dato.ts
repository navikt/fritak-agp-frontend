const NORWAY_REGEX = new RegExp('^(\\d{1,2})\\.(\\d{1,2})\\.(\\d{4})$');

export interface Dato {
  value?: string;
  error?: string;
  year?: number;
  month?: number;
  day?: number;
}

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
  if (month < 1) {
    return {
      value: date,
      error: 'Ugyldig måned'
    };
  }
  if (month > 12) {
    return {
      value: date,
      error: 'Ugyldig måned'
    };
  }
  const v = new Date(year, month - 1, day);
  if (v.getDate() != day) {
    return {
      value: date,
      error: 'Ugyldig dato'
    };
  }
  return {
    value: date,
    day,
    month,
    year
  };
};
