import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  subtotal: number;

  @Column()
  price: number;

  @ManyToOne((type) => Invoice, (invoice) => invoice.items)
  @JoinColumn()
  invoice: Invoice;
}
