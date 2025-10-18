import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmprendedoresModule } from './emprendedores/emprendedores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',     
      password: 'Jrlazo23',  
      database: 'Emprendy',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuariosModule,
    EmprendedoresModule,
    AuthModule,
  ],
  
})
export class AppModule {}
