import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacanсy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [],
  providers: [],
})
export class VacancyModule {}

