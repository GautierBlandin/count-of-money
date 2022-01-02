import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @Column({ nullable: true })
  summary: string;
  @Column({ type: 'date' })
  date: Date;
  @Column()
  source: string;
  @Column()
  url: string;
  @Column({ nullable: true })
  imageUrl: string;
}
