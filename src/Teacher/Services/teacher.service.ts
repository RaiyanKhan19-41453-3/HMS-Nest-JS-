import { Injectable } from '@nestjs/common';
import { DepartmentEntity } from '../Entities/department.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentDTO } from '../DTOs/department.dto';
import { TeacherProfileDTO } from '../DTOs/teacherProfile.dto';
import { TeacherProfileEntity } from '../Entities/teacherProfile.entity';
import { TeacherSalaryDTO } from '../DTOs/teacherSalary.dto';
import { TeacherSalaryEntity } from '../Entities/teacherSalary.entity';
import { ResearchDTO } from '../DTOs/research.dto';
import { ResearchEntity } from '../Entities/research.entity';
import { TeacherProfileUpdateDTO } from '../DTOs/teacherProfileUpdate.dto';
import { ResearchUpdateDTO } from '../DTOs/researchUpdate.dto';
import { DepartmentUpdateDTO } from '../DTOs/departmentUpdate.dto';
import { TeacherSalaryUpdateDTO } from '../DTOs/teacherSalaryUpdate.dto';

@Injectable()
export class TeacherService {

  constructor(
    @InjectRepository(DepartmentEntity)
    private DepartmentRepo: Repository<DepartmentEntity>,
    @InjectRepository(TeacherProfileEntity)
    private TeacherProfileRepo: Repository<TeacherProfileEntity>,
    @InjectRepository(TeacherSalaryEntity)
    private TeacherSalaryRepo: Repository<TeacherSalaryEntity>,
    @InjectRepository(ResearchEntity)
    private ResearchRepo: Repository<ResearchEntity>
  ){}

  //Create Part Start

  async addDepartment(DeptDTO: DepartmentDTO){
    return await this.DepartmentRepo.save(DeptDTO);
  }

  async addTeacherProfile(ProfileDTO: TeacherProfileDTO){
    const dept = await this.DepartmentRepo.findOneBy({DeptId:ProfileDTO.DepartmentId});
    ProfileDTO.Department = dept;
    (await dept).NumberOfWorkers += 1;
    await this.DepartmentRepo.save(dept);
    return await this.TeacherProfileRepo.save(ProfileDTO);
  }

  async addTeacherSalary(SalaryDTO: TeacherSalaryDTO){
    const teacher = await this.TeacherProfileRepo.findOneBy({TeacherProfileId:SalaryDTO.TeacherProfileId});
    SalaryDTO.Teacher = teacher;
    return await this.TeacherSalaryRepo.save(SalaryDTO);
  }

  async addResearch(ResearchDTO: ResearchDTO){
    const teacher = await this.TeacherProfileRepo.findOneBy({TeacherProfileId:ResearchDTO.TeacherProfileId});
    ResearchDTO.Teacher = teacher;
    return await this.ResearchRepo.save(ResearchDTO);
  }

  //Create Part End

  //Read Part Start

  async getAllDepartments(): Promise<DepartmentDTO[]>{
    return await this.DepartmentRepo.find();
  }

  async getAllTeacherProfiles(): Promise<any>{
    return await this.TeacherProfileRepo.find({
      select:{
        TeacherName: true,

        Dob: true,

        Phone: true,

        Email: true,

        Address: true,

        EmploymentStatus: true,

        EducationalBackground: true,

        ProfessionalExperience: true,

        PersonalWebsite: true
      }
    });
  }

  async getAllTeacherSalaries(): Promise<any>{
    return await this.TeacherSalaryRepo.find({
      select:{
        Amount: true,

        Bonuses: true
      }
    });
  }

  async getAllResearches(): Promise<any>{
    return await this.ResearchRepo.find({
      select:{
        ResearchName: true,

        Link: true
      }
    })
  }

  //Read Part End

  //Update Part Start

  async updateDepartment(id: number, DeptDTO: DepartmentUpdateDTO): Promise<DepartmentDTO>{
    await this.DepartmentRepo.update(id, DeptDTO);
    return await this.DepartmentRepo.findOneBy({DeptId:id});
  }

  async updateTeacherProfile(email: string, ProfileDTO: TeacherProfileUpdateDTO): Promise<any>{
    //const id = this.TeacherProfileRepo.findOneBy({TeacherProfileId:id})
    //const dept = await this.DepartmentRepo.findOneBy({DeptId: ProfileDTO.DepartmentId});
    await this.TeacherProfileRepo.update({Email: email}, ProfileDTO);
    // await this.TeacherProfileRepo.update({
    //   Email: email
    // }, 
    // {
    //   TeacherName: ProfileDTO.TeacherName, 
    //   Dob: ProfileDTO.Dob,
    //   Phone: ProfileDTO.Phone,
    //   Address: ProfileDTO.Address,
    //   PersonalWebsite: ProfileDTO.PersonalWebsite,
    //   ProfessionalExperience: ProfileDTO.ProfessionalExperience,
    //   Department: dept
    // });
    return await this.TeacherProfileRepo.findOneBy({Email: email});
  }

  async updateTeacherSalary(id: number, SalaryDTO: TeacherSalaryUpdateDTO): Promise<any>{
    var salary = await this.TeacherSalaryRepo.findOneBy({TeacherProfileId: id});
    await this.TeacherSalaryRepo.update(salary.SalaryId, SalaryDTO);
    return await this.TeacherSalaryRepo.findOneBy({SalaryId:salary.SalaryId});
  }

  async updateResearch(id: number, ResearchDTO: ResearchUpdateDTO): Promise<any>{
    await this.ResearchRepo.update(id, ResearchDTO);
    return await this.ResearchRepo.findOneBy({Id:id});
  }

  //Update Part End

  //Delete Part Start

  async deleteDepartment(id: number): Promise<void>{
    await this.DepartmentRepo.delete(id);
  }

  async deleteTeacherProfile(id: number): Promise<void>{
    const emp = await this.TeacherProfileRepo.findOne({where:{TeacherProfileId: id}, relations:{Department:true}});
    var deptId = emp.Department.DeptId;
    const dept = await this.DepartmentRepo.findOneBy({DeptId: deptId});
    dept.NumberOfWorkers -= 1;
    await this.DepartmentRepo.update(dept.DeptId, dept);
    await this.TeacherProfileRepo.delete(id);
  }

  async deleteTeacherSalary(id: number): Promise<void>{
    var salary = await this.TeacherSalaryRepo.findOneBy({TeacherProfileId: id})
    await this.TeacherSalaryRepo.delete(salary.SalaryId);
  }

  async deleteResearch(id: number): Promise<void>{
    await this.ResearchRepo.delete(id);
  }

  //Delete Part End

  //Feature Api Start

  async findTeacherByName(name: string): Promise<any>{
    return await this.TeacherProfileRepo.find({
      select:{
        TeacherName: true,

        Dob: true,

        Phone: true,

        Email: true,

        Address: true,

        EmploymentStatus: true,

        EducationalBackground: true,

        ProfessionalExperience: true,

        PersonalWebsite: true
      },
      where:{
        TeacherName: name
      }
    });
  }

  async findDepartmentHeadByDepartmentName(DeptName: string): Promise<any>{
    const DeptHead = await this.DepartmentRepo.find({
      select:{
        DepartmentHead: true
      },
      where:{
        DepartmentName: DeptName
      }
    });
    return DeptHead;
  }

  async getTeacherSalaryByName(name: string): Promise<any>{
    var teacher = await this.TeacherProfileRepo.findOneBy({TeacherName:name});
    return await this.TeacherSalaryRepo.find({
      select:{
        Amount:true
      },
      where:{
        Teacher:{TeacherProfileId: teacher.TeacherProfileId}
      }
    });
  }

  async getAllTeachersByDepartment(name: string): Promise<any>{
    return await this.DepartmentRepo.find({
      where:{
        DepartmentName: name
      },
      relations:{
        Teachers: true
      }
    })
  }

  async getDepartmentOfTeacher(name: string): Promise<any>{
    var d = await this.TeacherProfileRepo.find({
      select:{TeacherName:true, Department:{DepartmentName:true}},
      where:{
        TeacherName: name
      },
      relations:{
        Department: true
      }
    });
    return d;
  }

  async getTeacherListWithinSalaryRange(lowRange: number = 0, hightRange: number): Promise<any>{
    return await this.TeacherProfileRepo
    .createQueryBuilder('TeacherProfile')
    .leftJoin('TeacherProfile.TeacherSalary', 'TeacherSalary')
    .where('TeacherSalary.Amount >= :lowRange', { lowRange })
    .andWhere('TeacherSalary.Amount <= :hightRange', { hightRange })
    .getMany();
  }

  async transferDeparment(empId: number, deptId: number): Promise<any>{
    const emp = await this.TeacherProfileRepo.findOne({where:{TeacherProfileId: empId}, relations:{Department:true}});
    const previousDeptId = emp.Department.DeptId;
    const previousDept = await this.DepartmentRepo.findOneBy({DeptId: previousDeptId});
    previousDept.NumberOfWorkers -= 1;
    await this.DepartmentRepo.update(previousDeptId, previousDept);
    const dept = await this.DepartmentRepo.findOneBy({DeptId: deptId});
    dept.NumberOfWorkers += 1;
    await this.DepartmentRepo.update(dept.DeptId, dept);
    emp.Department = dept;
    emp.DepartmentId = dept.DeptId;
    return await this.TeacherProfileRepo.update(empId, emp);
  }

  //Feature Api End

  async login(profileDTO: TeacherProfileDTO){
    if(profileDTO.Email != null){
      const data = await this.TeacherProfileRepo.findOneBy({ Email: profileDTO.Email });
      if(data!=null){
        return true;
      }
      else{
        return false;
      }
    } 
    else{
      return false;
    }
  }
}
