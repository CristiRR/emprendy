import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-user.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
  ) {}

  async registrarUsuario(data: CreateUsuarioDto) {
    const { name, lastname, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const existe = await this.usuariosRepo.findOne({ where: { email } });
    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = this.usuariosRepo.create({
      name,
      lastname,
      email,
      password: hash,
    });

    return this.usuariosRepo.save(nuevoUsuario);
  }

  async obtenerUsuarios() {
    return this.usuariosRepo.find({
      select: ['id', 'name', 'lastname', 'email'],
    });
  }

  async obtenerPorCorreo(email: string) {
    return this.usuariosRepo.findOne({ where: { email } });
  }
}
