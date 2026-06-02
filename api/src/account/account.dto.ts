import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class AccountDto {
    @ApiProperty({ example: 'johndoe' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'pwdJohn' })
    @IsNotEmpty()
    password: string;
}

export interface AccountWithRoles {
    id: number;
    username: string;
    roles: Role[]
}