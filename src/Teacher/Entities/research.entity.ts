import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherProfileEntity } from "./teacherProfile.entity";

@Entity("Research")
export class ResearchEntity{
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    ResearchName: string;

    @Column()
    Link: string;

    @ManyToOne(() => TeacherProfileEntity, (teacherProfileEntity) => teacherProfileEntity.Researches)
    Teacher: TeacherProfileEntity;
}