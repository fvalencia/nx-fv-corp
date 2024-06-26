import { Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Entity } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceNumber: string;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  subtotal: number;

  @Column()
  tax: number;

  @Column()
  total: number;

  @Column({ default: true })
  paid: boolean;

  @OneToMany((type) => InvoiceItem, (invoiceItem) => invoiceItem.invoice)
  @JoinColumn()
  items: InvoiceItem[];
}
