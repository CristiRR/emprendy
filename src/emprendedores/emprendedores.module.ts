import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprendedor } from './entities/emprendedor.entity';
import { EmprendedoresService } from './emprendedores.service';
import { EmprendedoresController } from './emprendedores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Emprendedor])],
  controllers: [EmprendedoresController],
  providers: [EmprendedoresService],
  exports: [EmprendedoresService],
})
export class EmprendedoresModule {}
