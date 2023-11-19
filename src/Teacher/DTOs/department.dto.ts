import { IsNumber, IsString } from "class-validator";

export class DepartmentDTO{

    @IsString()
    DepartmentName: string;

    @IsString()
    DepartmentHead: string;

    @IsString()
    Description: string;

    @IsString()
    ContactEmail: string;

    @IsNumber()
    NumberOfWorkers: number;
}