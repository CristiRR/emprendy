import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(product: Partial<Product>) {
    const newProduct = this.productRepo.create(product);
    return this.productRepo.save(newProduct);
  }

  findAll() {
    return this.productRepo.find();
  }
}
