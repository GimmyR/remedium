import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from 'generated/prisma/client';

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