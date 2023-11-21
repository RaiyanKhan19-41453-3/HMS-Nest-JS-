import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherEntity } from "./teacher.entity";
import { DepartmentEntity } from "./department.entity";
import { TeacherSalaryEntity } from "./teacherSalary.entity";
import { ResearchEntity } from "./research.entity";

@Entity("TeacherProfile")
export class TeacherProfileEntity{
    @PrimaryGeneratedColumn()
    TeacherProfileId: number;

    @Column()
    TeacherName: string;

    @Column()
    Dob: string;

    @Column()
    Phone: string;

    @Column()
    Email: string;

    @Column()
    Address: string;

    @Column()
    EmploymentStatus: string;

    @Column()
    EducationalBackground: string;

    @Column()
    ProfessionalExperience: string;

    @Column()
    PersonalWebsite: string;

    @Column()
    filename: string;

    @Column()
    DepartmentId: number;

    @OneToOne(() => TeacherEntity, teacherEntity => teacherEntity.Profile)
    Teacher: TeacherEntity;

    @OneToOne(() => TeacherSalaryEntity, teacherSalaryEntity => teacherSalaryEntity.Teacher)
    TeacherSalary: TeacherSalaryEntity;

    @ManyToOne(() => DepartmentEntity, (departmentEntity) => departmentEntity.Teachers)
    Department: DepartmentEntity;

    @OneToMany(() => ResearchEntity, (researchEntity) => researchEntity.Teacher)
    Researches: ResearchEntity[];
}