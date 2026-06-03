import { Compound } from '@prisma/client';

export interface TestDetailWithCompound {
    id: number;
    compound: Compound;
    amount: number;
}
