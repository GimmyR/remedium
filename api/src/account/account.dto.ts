import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AccountDto {
    @ApiProperty({ example: "johndoe" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: "pwdJohn" })
    @IsNotEmpty()
    password: string;
}