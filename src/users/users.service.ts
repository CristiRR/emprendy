import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    return { message: 'User created successfully', user };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOneBy({
      email: loginUserDto.email,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = this.authService.generateJwt(user);
    return { message: 'Login successful', token, user };
  }

  async findAll() {
    return this.usersRepository.find({
      select: ['id', 'name', 'email', 'role'],
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'role'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
