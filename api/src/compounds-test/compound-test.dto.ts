import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsPositive } from 'class-validator';
import { TestDetailWithCompound } from 'src/test-detail/test-detail.dto';

export class CompoundTestDto {
    @ApiProperty({ example: 1 })
    @IsPositive()
    compoundId!: number;

    @ApiProperty({ example: 300 })
    @IsPositive()
    amount!: number;

    error?: boolean;
    message?: string;
}

export class CreateTest {
    @IsNotEmpty({ message: "Applicant is missing" })
    @ApiProperty({ description: "The person or company who wants to test the medication", example: "Dr. John Doe" })
    applicant!: string;

    @IsNotEmpty({ message: "Reason is missing" })
    @ApiProperty({ description: "The reason why the applicant wants to test the medication", example: "Treating diabetes" })
    reason!: string;

    @IsArray({ message: "Compounds should be an array" })
    @ArrayNotEmpty({ message: "Compounds should not be an empty array" })
    compounds!: CompoundTestDto[];
}

export interface CompoundsTestWithDetails {
    id: number;
    testDate: Date;
    applicant: string;
    reason: string;
    details: TestDetailWithCompound[];
}
