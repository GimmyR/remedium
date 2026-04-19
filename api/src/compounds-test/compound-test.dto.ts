import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

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
