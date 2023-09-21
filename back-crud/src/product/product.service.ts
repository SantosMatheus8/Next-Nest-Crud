import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository') private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product();
    product.name = createProductDto.name;
    product.category = createProductDto.category;
    product.price = createProductDto.price;

    return this.productRepository.save(createProductDto);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      category: updateProductDto.category,
      name: updateProductDto.name,
      price: updateProductDto.price,
    });

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    return this.productRepository.remove(product);
  }
}
