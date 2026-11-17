import { differenceInCalendarDays } from 'date-fns';

const isBeforeDate = (dagen: Date, minDate: Date): boolean => differenceInCalendarDays(dagen, minDate) < 0;

export default isBeforeDate;
