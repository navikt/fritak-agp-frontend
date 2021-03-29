import NotifikasjonType from '../felles/NotifikasjonType';

interface NotifikasjonPayload {
  status: number;
  uuid?: string;
  json?: any;
  notifikasjonsType: NotifikasjonType;
}

export default NotifikasjonPayload;
