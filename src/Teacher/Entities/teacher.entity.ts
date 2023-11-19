import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DepartmentEntity } from "./department.entity";
import { TeacherProfileEntity } from "./teacherProfile.entity";

@Entity("Teacher")
export class TeacherEntity{
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    TeacherName: string;

    @Column()
    SupervisorId: number;
    
    @OneToOne(() => TeacherProfileEntity, teacherProfileEntity => teacherProfileEntity.Teacher, { cascade: true})
    @JoinColumn()
    Profile: TeacherProfileEntity;
}