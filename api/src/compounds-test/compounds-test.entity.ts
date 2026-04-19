import { TestDetail } from 'src/test-detail/test-detail.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompoundsTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamptz',
  })
  testDate: Date;

  @OneToMany(() => TestDetail, (detail) => detail.test)
  details: TestDetail[];
}
