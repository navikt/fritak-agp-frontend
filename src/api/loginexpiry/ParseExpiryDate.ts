import dayjs from 'dayjs';

export const ParseExpiryDate = (value: string): Date => {
  return dayjs(value).toDate();
};

export default ParseExpiryDate;
