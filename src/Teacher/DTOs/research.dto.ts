import { TeacherProfileEntity } from "../Entities/teacherProfile.entity";

export class ResearchDTO{
    Id: number;

    ResearchName: string;

    Link: string;

    TeacherProfileId: number;
    
    Teacher: TeacherProfileEntity;
}