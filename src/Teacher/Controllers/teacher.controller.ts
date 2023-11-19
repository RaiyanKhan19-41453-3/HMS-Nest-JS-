import { Body, Controller, Delete, FileTypeValidator, Get, HttpException, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeacherService } from '../Services/teacher.service';
import { DepartmentDTO } from '../DTOs/department.dto';
import { TeacherProfileDTO } from '../DTOs/teacherProfile.dto';
import { TeacherSalaryDTO } from '../DTOs/teacherSalary.dto';
import { ResearchDTO } from '../DTOs/research.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { getEnabledCategories } from 'trace_events';
import { SessionGuard } from '../session.guard';

@Controller('Teacher')
@UsePipes(new ValidationPipe())
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  //Create Start

  @Post('/AddDepartment')
  addDepartment(@Body() deptDTO:DepartmentDTO){
    try{
      return this.teacherService.addDepartment(deptDTO);
    }catch(error){
      throw new HttpException('Not Created',HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/addTeacherProfile')
  @UseInterceptors(FileInterceptor('myfile', {
    storage: diskStorage({
      destination: './src/Teacher/uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      }
    })
  }))
  addTeacherProfile(@Body() profileDTO:TeacherProfileDTO, @UploadedFile(new ParseFilePipe({
    validators:[
      new MaxFileSizeValidator({maxSize: 20000000}),
      new FileTypeValidator({fileType: 'png|jpg|jpeg'})
    ]
  })) file: Express.Multer.File){
    try{
      profileDTO.filename = file.filename;
      return this.teacherService.addTeacherProfile(profileDTO);
    }catch(error){
      throw new HttpException('Not Created',HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/addTeacherSalary')
  addTeacherSalary(@Body() salaryDTO:TeacherSalaryDTO){
    try{
      return this.teacherService.addTeacherSalary(salaryDTO);
    }catch(error){
      throw new HttpException('Not Created',HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/addResearch')
  addResearch(@Body() researchDTO:ResearchDTO){
    try{
      return this.teacherService.addResearch(researchDTO);
    }catch(error){
      throw new HttpException('Not Created',HttpStatus.BAD_REQUEST);
    }
  }

  //Create End

  //Read Start

  @Get('/getDepartments')
  getDepartments(){
    try{
      return this.teacherService.getAllDepartments();
    }catch(error){
      throw new HttpException('Cant Retreive',HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getTeacherProfiles')
  getTeacherProfiles(){
    try{
      return this.teacherService.getAllTeacherProfiles();
    }catch(error){
      throw new HttpException('Cant Retreive',HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getTeacherSalaries')
  getTeacherSalaries(){
    try{
      return this.teacherService.getAllTeacherSalaries();
    }catch(error){
      throw new HttpException('Cant Retreive',HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getResearches')
  getResearches(){
    try{
      return this.teacherService.getAllResearches();
    }catch(error){
      throw new HttpException('Cant Retreive',HttpStatus.BAD_REQUEST);
    }
  }

  //Read End

  //Update Start

  @Put('/updateDepartment/:id')
  updateDepartment(@Body() departmentDTO:DepartmentDTO, @Param('id', ParseIntPipe) id: number){
    try{
      return this.teacherService.updateDepartment(id, departmentDTO);
    }catch(error){
      throw new HttpException('Cant Update',HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/updateTeacherProfile/:id')
  @UseGuards(SessionGuard)
  updateTeacherProfile(@Session() session, @Body() profileDTO:TeacherProfileDTO, @Param('id', ParseIntPipe) id: number){
    try{
      return this.teacherService.updateTeacherProfile(session.email, id, profileDTO);
    }catch(error){
      throw new HttpException('Cant Update',HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/updateTeacherSalary/:id')
  updateTeacherSalary(@Body() salaryDTO:TeacherSalaryDTO, @Param('id', ParseIntPipe) id: number){
    try{
      return this.teacherService.updateTeacherSalary(id, salaryDTO);
    }catch(error){
      throw new HttpException('Cant Update',HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/updateResearch/:id')
  updateResearch(@Body() researchDTO:ResearchDTO, @Param('id', ParseIntPipe) id: number){
    try{
      return this.teacherService.updateResearch(id, researchDTO);
    }catch(error){
      throw new HttpException('Cant Update',HttpStatus.BAD_REQUEST);
    }
  }

  //Update End

  //Delete Start

  @Delete('/deleteDepartment/:id')
  deleteDepartment(@Param('id', ParseIntPipe) id: number){
    try{
      return this.teacherService.deleteDepartment(id);
    }catch(error){
      throw new HttpException('Cant Delete',HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/deleteTeacherProfile/:id')
  deleteTeacherProfile(@Param('id', ParseIntPipe) id: number){
    try{
      return this.teacherService.deleteTeacherProfile(id);
    }catch(error){
      throw new HttpException('Cant Delete',HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/deleteTeacherSalary/:id')
  deleteTeacherSalary(@Param('id', ParseIntPipe) id: number){
    try{
      return this.teacherService.deleteTeacherSalary(id);
    }catch(error){
      throw new HttpException('Cant Delete',HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/deleteResearch/:id')
  deleteResearch(@Param('id', ParseIntPipe) id: number){
    try{
      return this.teacherService.deleteResearch(id);
    }catch(error){
      throw new HttpException('Cant Delete',HttpStatus.BAD_REQUEST);
    }
  }

  //Delete End

  //Feature Start

  @Get('/findTeacherByName/:name')
  searchTeacher(@Param('name') name: string){
    try{
      return this.teacherService.findTeacherByName(name);
    }catch(error){
      throw new HttpException('Cant Find',HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/findDepartmentHead/:name')
  findDepartmentHead(@Param('name') name: string){
    try{
      return this.teacherService.findDepartmentHeadByDepartmentName(name);
    }catch(error){
      throw new HttpException('Cant find', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getTeacherSalary/:name')
  findSalaryByName(@Param('name') name: string){
    try{
      return this.teacherService.getTeacherSalaryByName(name);
    }catch(error){
      throw new HttpException('Cant find', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getTeachersByDepartment/:name')
  findTeachersByDepartment(@Param('name') name: string){
    try{
      return this.teacherService.getAllTeachersByDepartment(name);
    }catch(error){
      throw new HttpException('Cant find', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getDepartmentOfTeacher/:name')
  findDepartmentOfTeacher(@Param('name') name: string){
    try{
      return this.teacherService.getDepartmentOfTeacher(name);
    }catch(error){
      throw new HttpException('Cant find', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getTeachersWithinSalaryRange/low/:l/high/:h')
  getTeacherWithinSalary(@Param('l', ParseIntPipe) low: number, @Param('h', ParseIntPipe) high: number){
    try{
      return this.teacherService.getTeacherListWithinSalaryRange(low, high);
    }catch(error){
      throw new HttpException('Cant find', HttpStatus.BAD_REQUEST);
    }
  }

  //Feature End

  @Post('/login')
  async login(@Session() session, @Body() profileDTO: TeacherProfileDTO){
    const data = await this.teacherService.login(profileDTO);
    if(data){
      session.email = profileDTO.Email;
      return {message:"Logged In"};
    }
    else{
      throw new UnauthorizedException({message: "Invalid Credentials"});
    }
  }

  @Get('/logout')
  logout(@Session() session){
    if(session.destroy()){
      return {
        message: "Log Out"
      };
    }
    else{
      throw new UnauthorizedException("Invalid Actions");
    }
  }
}
