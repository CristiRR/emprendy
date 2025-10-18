import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmprendedoresService } from './emprendedores.service';
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto';

@Controller('emprendedores')
export class EmprendedoresController {
  constructor(private readonly emprendedoresService: EmprendedoresService) {}

  @Post('register')
  async register(@Body() data: CreateEmprendedorDto) {
    return this.emprendedoresService.registrarEmprendedor(data);
  }

  @Get()
  async getAll() {
    return this.emprendedoresService.obtenerEmprendedores();
  }
}
