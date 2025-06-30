export class UpdateFinanceDto {
  description?: string;
  type?: 'ENTRADA' | 'SAIDA';
  amount?: number;
  date?: Date;
}
