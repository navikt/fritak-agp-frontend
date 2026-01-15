import NotifikasjonType from '../felles/NotifikasjonType';

interface NotifikasjonPayload {
  status: number;
  uuid?: string;
  json?: unknown;
  notifikasjonsType: NotifikasjonType;
}

export default NotifikasjonPayload;
