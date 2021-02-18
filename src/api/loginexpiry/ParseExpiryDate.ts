import dayjs from 'dayjs';

export const ParseExpiryDate = (value: string) => dayjs(value).toDate();

export default ParseExpiryDate;
