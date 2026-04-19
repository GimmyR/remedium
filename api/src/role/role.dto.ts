import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  @ApiProperty({ example: 1, description: 'Update a role by his ID' })
  id?: number;

  @ApiProperty({ example: 'Client', description: 'Name of the role' })
  @IsNotEmpty()
  name: string;
}
