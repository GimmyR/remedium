import { Compound } from "src/compound/compound.entity";
import { CompoundsTest } from "src/compounds-test/compounds-test.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TestDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CompoundsTest, (test) => test.details)
    test: CompoundsTest;

    @ManyToOne(() => Compound)
    compound: Compound;

    @Column()
    amount: number;
}