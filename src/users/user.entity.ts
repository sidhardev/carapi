import {Entity,AfterRemove, AfterInsert, AfterUpdate,PrimaryGeneratedColumn, Column, Exclusion} from 'typeorm';
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