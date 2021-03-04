import NotifikasjonType from '../felles/NotifikasjonType';

export interface NotifikasjonPayload {
  status: number;
  uuid?: string;
  json?: any;
  notifikasjonsType: NotifikasjonType;
}
