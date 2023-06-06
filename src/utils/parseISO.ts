import dayjs from 'dayjs';

export default function parseISO(dateString: string): Date {
  return dayjs(dateString).toDate();
}
