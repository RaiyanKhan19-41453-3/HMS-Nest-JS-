import { IsEmail, Matches } from "class-validator";
import { DepartmentEntity } from "../Entities/department.entity";

export class TeacherProfileUpdateDTO{
    TeacherName: string;

    Dob: string;

    Phone: string;

    Address: string;

    EmploymentStatus: string;

    EducationalBackground: string;

    ProfessionalExperience: string;

    PersonalWebsite: string;
}