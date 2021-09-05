import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyController } from './controllers/vacancy.controller';
import { Vacancy } from './entities/vacanсy.entity';
import { VacancyService } from './services/vacancy.services';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}

