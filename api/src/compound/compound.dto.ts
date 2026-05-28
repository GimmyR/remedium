import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class SaveCompoundRequest {
    @IsOptional()
    @IsPositive({ message: "ID should be a positive number" })
    @ApiProperty({ example: 1, nullable: true })
    id?: number;

    @IsNotEmpty({ message: "Title is missing" })
    @ApiProperty({ example: "Paracetamol" })
    title: string;

    @IsOptional()
    @IsNotEmpty({ message: "Unit is missing" })
    @ApiProperty({ example: "mg" })
    unit?: string;

    @IsOptional()
    @Min(0, { message: "Min should be a positive number or zero" })
    @ApiProperty({ example: 500 })
    min?: number;

    @IsOptional()
    @Min(0, { message: "Max should be a positive number or zero" })
    @ApiProperty({ example: 1000 })
    max?: number;

    @IsDefined({ message: "Active is missing" })
    @ApiProperty({ example: true })
    active: boolean;
}

export class UpdateActiveRequest {
    @IsDefined({ message: "ID is missing" })
    @IsPositive({ message: "ID should be a positive number" })
    @ApiProperty({ example: 1 })
    id: number;

    @IsDefined({ message: "Active is missing" })
    @ApiProperty({ example: false })
    active: boolean;
}