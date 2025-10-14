import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'buyer' }) // 'buyer' o 'seller'
  role: string;

  @Column({ nullable: true })
  businessName?: string;

  @Column({ nullable: true })
  category?: string;
}
