import dayjs from 'dayjs';

export default function formatISO(date: Date | undefined): string | undefined {
  if (!date) return undefined;
  return dayjs(date).format('YYYY-MM-DD');
}
