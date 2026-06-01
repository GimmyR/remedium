import { TestDetail } from "./test-detail";

export interface CompoundTest {
    compoundId: number;
    amount: number;
    error?: boolean;
    message?: string;
}

export interface CompoundsTest {
    id: number;
    testDate: Date;
    details: TestDetail[]
}