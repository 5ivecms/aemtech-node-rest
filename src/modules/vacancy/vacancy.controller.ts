import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Request } from 'express';
import { VacancyModel } from '../../models';
import { Vacancy } from '../../entities';
import { VacancyService } from './vacancy.service';

@Controller('rest/vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  async actionIndex(@Req() request: Request) {
    const queryBuilder = await this.vacancyService.queryBuilder('vacancy')
  
    const search = request.query.search
    if (search) {
      queryBuilder.where('vacancy.title LIKE :s', {s: `%${request.query.search}%`})
    }

    const sort: any = request.query.sort
    if (sort) {
      queryBuilder.orderBy('vacancy.id', sort.toUpperCase())
    }

    const isPublish: any = request.query.isPublish
    if (isPublish) {
      queryBuilder.where('vacancy.isPublish = :p', {p: request.query.isPublish})
    }

    const total = await queryBuilder.getCount()
    const page: number = parseInt(request.query.page as any) || 1
    const perPage = parseInt(request.query.perPage as any) || 10
    const lastPage = Math.ceil(total / perPage)

    if (lastPage < page) {
      throw new NotFoundException()
    }

    queryBuilder.offset((page - 1) * perPage).limit(perPage)

    return {
      items: await queryBuilder.getMany(),
      total,
      page,
      perPage,
      lastPage
    }
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