import { Module } from '@nestjs/common';
import { TeacherModule } from './Teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TeacherModule, TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '1234',
     database: 'Hms',
     autoLoadEntities: true,
     synchronize: true,
   }
   )],
  controllers: [],
  providers: [],
})
export class AppModule {}
