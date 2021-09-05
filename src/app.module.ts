import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VacancyModule } from './modules/vacancy';

@Module({
  imports: [TypeOrmModule.forRoot(), VacancyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}