import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function parseDato(dato: string): Date | undefined {
  dayjs.extend(customParseFormat);
  if (dayjs(dato, 'DD.MM.YYYY', true).isValid()) {
    return dayjs(dato, 'DD.MM.YYYY').toDate();
  } else return undefined;
}
