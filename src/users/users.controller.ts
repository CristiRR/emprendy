import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { CreateUsuarioDto } from './dto/create-user.dto';

@Controller('users')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post('register')
  async registrar(@Body() body: CreateUsuarioDto) {
    return this.usuariosService.registrarUsuario(body);
  }

  @Get()
  async listar() {
    return this.usuariosService.obtenerUsuarios();
  }
}
