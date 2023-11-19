import { Module } from '@nestjs/common';
import { TeacherController } from './Controllers/teacher.controller';
import { TeacherService } from './Services/teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherProfileEntity } from './Entities/teacherProfile.entity';
import { DepartmentEntity } from './Entities/department.entity';
import { TeacherEntity } from './Entities/teacher.entity';
import { TeacherSalaryEntity } from './Entities/teacherSalary.entity';
import { ResearchEntity } from './Entities/research.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, TeacherProfileEntity, TeacherEntity, TeacherSalaryEntity, ResearchEntity])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
