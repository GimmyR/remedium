import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { TestDetailWithCompound } from 'src/test-detail/test-detail.dto';

export class CompoundTestDto {
    @ApiProperty({ example: 1 })
    @IsPositive()
    compoundId: number;

    @ApiProperty({ example: 300 })
    @IsPositive()
    amount: number;

    error?: boolean;
    message?: string;
}

export interface CompoundsTestWithDetails {
    id: number;
    testDate: Date;
    details: TestDetailWithCompound[];
}
