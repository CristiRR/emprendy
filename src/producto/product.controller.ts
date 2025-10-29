import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { extname } from 'path';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueSuffix + extname(file.originalname));
                },
            }),
        }),
    )
    create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (file) {
            createProductDto.image_url = file.filename; // agregamos la imagen al DTO
        }

        return this.productService.create(createProductDto);
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads ',
                filename: (req, file, cb) => {
                    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
                    cb(null, uniqueName);
                },
            }),
        }),
    )
    async update(
        @Param('id') id: number,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.productService.update(id, updateProductDto, file);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
        await this.productService.deleteProduct(id);
        return { message: 'Producto eliminado correctamente' };
    }


    @Get()
    findAll() {
        return this.productService.findAll();
    }
}
