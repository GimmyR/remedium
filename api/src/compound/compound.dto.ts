import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class SaveCompoundRequest {
    @IsOptional()
    @IsPositive({ message: "ID should be a positive number" })
    id?: number;

    @IsNotEmpty({ message: "Title is missing" })
    title: string;

    @IsOptional()
    @IsNotEmpty({ message: "Unit is missing" })
    unit?: string;

    @IsOptional()
    @Min(0, { message: "Min should be a positive number or zero" })
    min?: number;

    @IsOptional()
    @Min(0, { message: "Max should be a positive number or zero" })
    max?: number;

    @IsDefined({ message: "Active is missing" })
    active: boolean;
}

export class UpdateActiveRequest {
    @IsDefined({ message: "ID is missing" })
    @IsPositive({ message: "ID should be a positive number" })
    id: number;

    @IsDefined({ message: "Active is missing" })
    active: boolean;
}