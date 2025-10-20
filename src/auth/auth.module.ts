import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { EmprendedoresModule } from 'src/emprendedores/emprendedores.module';

@Module({
  imports: [
    UsuariosModule,
    EmprendedoresModule,
    PassportModule,
    JwtModule.register({
      secret: 'mi_secreto_super_seguro',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
