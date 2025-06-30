export class CreateFinanceDto {
  description: string;
  type: 'ENTRADA' | 'SAIDA';
  amount: number;
  date: Date;
}
