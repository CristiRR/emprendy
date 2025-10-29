import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ) {
    const product = await this.productRepo.findOne({where: {id}});
    if (!product) throw new NotFoundException ('Product not found');

    if (file) {
      updateProductDto.image_url = `/uploads/${file.filename}`;
    }

    Object.assign(product, updateProductDto);
    product.updated_at= new Date();

    return this.productRepo.save(product);
  }
  
  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  findAll() {
    return this.productRepo.find();
  }
}
