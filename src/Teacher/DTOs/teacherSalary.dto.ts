import { TeacherProfileEntity } from "../Entities/teacherProfile.entity";

export class TeacherSalaryDTO{
    Amount: number;

    Bonuses: number;

    TeacherProfileId: number;

    Teacher: TeacherProfileEntity;
}