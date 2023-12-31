import { IsEmail, Matches } from "class-validator";
import { DepartmentEntity } from "../Entities/department.entity";

export class TeacherProfileDTO{
    TeacherName: string;

    Dob: string;

    @Matches(/^\+880[0-9]{10}$/)
    Phone: string;

    @IsEmail()
    Email: string;

    Address: string;

    EmploymentStatus: string;

    EducationalBackground: string;

    ProfessionalExperience: string;

    PersonalWebsite: string;

    filename: string;

    DepartmentId: number;

    Department: DepartmentEntity;
}