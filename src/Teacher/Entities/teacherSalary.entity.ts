import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherProfileEntity } from "./teacherProfile.entity";

@Entity("TeacherSalary")
export class TeacherSalaryEntity{
    @PrimaryGeneratedColumn()
    SalaryId: number;

    @Column()
    Amount: number;

    @Column()
    Bonuses: number;

    @Column()
    TeacherProfileId: number;

    @OneToOne(() => TeacherProfileEntity, teacherProfileEntity => teacherProfileEntity.Teacher, { cascade: true})
    @JoinColumn()
    Teacher: TeacherProfileEntity;
}