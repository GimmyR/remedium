import { TestDetail } from "./test-detail";

export interface CompoundTest {
    compoundId: number;
    amount: number;
    error?: boolean;
    message?: string;
}

export interface CreateTest {
    applicant: string;
    reason: string;
    compounds: CompoundTest[];
}

export interface CompoundsTest {
    id: number;
    testDate: Date;
    applicant: string;
    reason: string;
    details: TestDetail[]
}