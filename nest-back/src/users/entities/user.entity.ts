import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn({ unique: true })
  email: string;

  @Column({ nullable: true })
  password_hash?: string;

  @Column({ default: 'EUR' })
  currency?: string;

  @Column({ type: 'simple-array', default: [] })
  cryptos: string[];

  @Column({ type: 'simple-array', default: [] })
  press_keywords: string[];

  @Column({ nullable: true })
  access_token?: string;

  @Column({ default: false })
  admin: boolean;
}
