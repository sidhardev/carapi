import {
  Entity,
  AfterRemove,
  AfterInsert,
  AfterUpdate,
  PrimaryGeneratedColumn,
  Column,
  Exclusion,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Reports } from 'src/reports/reports.entity';
import { Exclude } from 'class-transformer';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @OneToMany(() => Reports, (report) => report.user)
  @Exclude()
  reports: Reports[];
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
