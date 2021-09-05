import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Vacancy } from '../../entities';
import { VacancyModel } from '../../models';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy) private vacancyRepository: Repository<Vacancy>,
  ) {}

  async findAll(): Promise<Vacancy[]> {
    return await this.vacancyRepository.find();
  }

  async findById(id: number): Promise<Vacancy> {
    return await this.vacancyRepository.findOne(id);
  }

  async create(vacancy: VacancyModel): Promise<Vacancy> {
    return await this.vacancyRepository.save(
      this.vacancyRepository.create(vacancy)
    )
  }

  async update(vacancy: Vacancy): Promise<UpdateResult> {
    return await this.vacancyRepository.update(vacancy.id, vacancy)
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.vacancyRepository.delete(id);
  }

  async queryBuilder(entity: string) {
    return this.vacancyRepository.createQueryBuilder(entity)
  }
}