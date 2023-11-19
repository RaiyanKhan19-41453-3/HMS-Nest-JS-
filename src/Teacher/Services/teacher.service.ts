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
    await this.TeacherProfileRepo.save(ProfileDTO);
    const Dept = await this.DepartmentRepo.findOneBy({DeptId: ProfileDTO.DepartmentId});
    (await Dept).NumberOfWorkers += 1;
    return await this.DepartmentRepo.save(Dept);
  }

  async addTeacherSalary(SalaryDTO: TeacherSalaryDTO){
    return await this.TeacherSalaryRepo.save(SalaryDTO);
  }

  async addResearch(ResearchDTO: ResearchDTO){
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

  async updateDepartment(id: number, DeptDTO: DepartmentDTO): Promise<DepartmentDTO>{
    await this.DepartmentRepo.update(id, DeptDTO);
    return this.DepartmentRepo.findOneBy({DeptId:id});
  }

  async updateTeacherProfile(email: string, id: number, ProfileDTO: TeacherProfileDTO): Promise<any>{
    //const id = this.TeacherProfileRepo.findOneBy({TeacherProfileId:id})
    await this.TeacherProfileRepo.update({Email: email}, ProfileDTO);
    return this.TeacherProfileRepo.findOneBy({TeacherProfileId:id});
  }

  async updateTeacherSalary(id: number, SalaryDTO: TeacherSalaryDTO): Promise<any>{
    await this.TeacherSalaryRepo.update(id, SalaryDTO);
    return this.TeacherSalaryRepo.findOneBy({SalaryId:id});
  }

  async updateResearch(id: number, ResearchDTO: ResearchDTO): Promise<any>{
    await this.ResearchRepo.update(id, ResearchDTO);
    return this.ResearchRepo.findOneBy({Id:id});
  }

  //Update Part End

  //Delete Part Start

  async deleteDepartment(id: number): Promise<void>{
    await this.DepartmentRepo.delete(id);
  }

  async deleteTeacherProfile(id: number): Promise<void>{
    await this.TeacherProfileRepo.delete(id);
  }

  async deleteTeacherSalary(id: number): Promise<void>{
    await this.TeacherSalaryRepo.delete(id);
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
    return await this.TeacherProfileRepo.find({
      where:{
        TeacherName: name
      },
      relations:{
        Department: true
      }
    })
  }

  async getTeacherListWithinSalaryRange(lowRange: number = 0, hightRange: number): Promise<any>{
    const TeacherList = await this.TeacherProfileRepo.find();
    const FilteredList = TeacherList.filter(x => x.TeacherSalary.Amount > lowRange && x.TeacherSalary.Amount < hightRange);
    return FilteredList;
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
