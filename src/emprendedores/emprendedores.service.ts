import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Emprendedor } from './entities/emprendedor.entity';
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto';

@Injectable()
export class EmprendedoresService {
    constructor(
        @InjectRepository(Emprendedor)
        private readonly emprendedorRepo: Repository<Emprendedor>,
    ) { }

    async registrarEmprendedor(data: CreateEmprendedorDto) {
        const { name, lastname, email, password, confirmPassword, businessName, category } = data;

        if (password !== confirmPassword) {
            throw new BadRequestException('Las contraseñas no coinciden');
        }

        const existe = await this.emprendedorRepo.findOne({ where: { email } });
        if (existe) {
            throw new BadRequestException('El correo ya está registrado');
        }

        const hash = await bcrypt.hash(password, 10);

        const nuevo = this.emprendedorRepo.create({
            name,
            lastname,
            email,
            password: hash,
            businessName,
            category,
        });

        const saved = await this.emprendedorRepo.save(nuevo);
        console.log('SAVED:', saved);
        return { success: true, data: saved };
    }

    async obtenerEmprendedores() {
        return this.emprendedorRepo.find({
            select: ['id', 'businessName', 'category', 'name', 'lastname', 'email'],
        });
    }

    async obtenerPorCorreo(email: string) {
        return this.emprendedorRepo.findOne({ where: { email } });
    }
}
