import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { VacancyModel } from './../../../models';
import { Vacancy } from './../entities/vacanсy.entity';
import { VacancyService } from './../services/vacancy.services';

@Controller('rest/vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  async actionIndex(): Promise<Vacancy[]> {
    return await this.vacancyService.findAll()
  }

  @Get(':id')
  async actionFindOne(@Param('id') id: number): Promise<Vacancy> {
    const vacancy = await this.vacancyService.findById(id)
    
    if (!vacancy) {
      throw new NotFoundException()
    }

    return vacancy
  }

  @Post()
  async actionCreate(@Body() vacancy: VacancyModel): Promise<Vacancy> {
    return this.vacancyService.create(vacancy)
  }

  @Put(':id')
  async actionUpdate(
    @Param('id') id: number, 
    @Body() vacancy: VacancyModel
    ): Promise<UpdateResult> {
      const vacancyEntity = await this.vacancyService.findById(id)

      if (!vacancyEntity) {
        throw new NotFoundException()
      }

      return await this.vacancyService.update({
        ...vacancyEntity,
        ...vacancy
      })
  }

  @Delete(':id')
  async actionDelete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.vacancyService.remove(id)
  }
}