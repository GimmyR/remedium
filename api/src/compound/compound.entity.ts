import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compound {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    unit: string;

    @Column({ type: "float", nullable: true })
    min: number;

    @Column({ type: "float", nullable: true })
    max: number;

    @Column()
    active: boolean;
}
