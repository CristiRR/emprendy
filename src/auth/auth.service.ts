import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/users/users.service';
import { EmprendedoresService } from 'src/emprendedores/emprendedores.service';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private emprendedoresService: EmprendedoresService,
    private jwtService: JwtService,
  ) { }

  async validarUsuario(email: string, password: string) {
    const usuario = await this.usuariosService.obtenerPorCorreo(email);

    if (usuario) {
      const passwordValido = await bcrypt.compare(password, usuario.password);
      if (!passwordValido) {
        throw new UnauthorizedException('Correo o contraseña incorrectos');
      }
      return { ...usuario, rol: 'usuario' };
    }

    const emprendedor = await this.emprendedoresService.obtenerPorCorreo(email);

    if (emprendedor) {
      const passwordValido = await bcrypt.compare(password, emprendedor.password);
      if (!passwordValido) {
        throw new UnauthorizedException('Correo o contraseña incorrectos');
      }
      return { ...emprendedor, rol: 'emprendedor' };
    }


    throw new UnauthorizedException('Correo o contraseña incorrectos');
  }

  async login(usuario: any) {
    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  }
}
