import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compound {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    unit: string;

    @Column()
    min: number;

    @Column()
    max: number;

    @Column()
    active: boolean;
}
