import NotifikasjonType from './NotifikasjonType';

export interface NotifikasjonPayload {
  status: number;
  uuid?: string;
  json?: any;
  notifikasjonsType: NotifikasjonType;
}
