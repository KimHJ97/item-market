import { Module } from '@nestjs/common';
import { ManagerEntity } from '@persistence/manager/entities/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerConverter } from '@persistence/manager/converters/manager.converter';
import { ManagerRelationalRepository } from '@persistence/manager/repositories/manager.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity])],
  providers: [
    ManagerConverter,
    {
      provide: 'ManagerRepository',
      useClass: ManagerRelationalRepository,
    },
  ],
  exports: ['ManagerRepository'],
})
export class ManagerPersistenceModule {}
