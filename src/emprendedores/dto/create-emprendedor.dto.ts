import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Match } from 'src/common/guards/Decorators/match.decorator';

export class CreateEmprendedorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  businessName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  category: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastname: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(255)
  password: string;

  @IsString()
  @Match('password', { message: 'Las contraseñas no coinciden' })
  confirmPassword: string;
}
