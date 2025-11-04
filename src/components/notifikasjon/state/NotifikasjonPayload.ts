import NotifikasjonType from '../felles/NotifikasjonType';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface NotifikasjonPayload {
  status: number;
  uuid?: string;
  json?: JsonValue;
  notifikasjonsType: NotifikasjonType;
}

export default NotifikasjonPayload;
