import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherEntity } from "./teacher.entity";
import { TeacherProfileEntity } from "./teacherProfile.entity";

@Entity("Department")
export class DepartmentEntity{
    @PrimaryGeneratedColumn()
    DeptId: number;

    @Column()
    DepartmentName: string;

    @Column()
    DepartmentHead: string;

    @Column()
    Description: string;

    @Column()
    ContactEmail: string;

    @Column()
    NumberOfWorkers: number;

    @OneToMany(() => TeacherProfileEntity, (teacherProfileEntity) => teacherProfileEntity.Department)
    Teachers: TeacherProfileEntity[];
}