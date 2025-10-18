import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('emprendedores')
export class Emprendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'business_name', length: 150 })
  businessName: string;

  @Column({ length: 100 })
  category: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
