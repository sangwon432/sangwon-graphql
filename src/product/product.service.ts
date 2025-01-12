import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();
    if (products.length === 0) {
      throw new NotFoundException();
    }
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create(createProductDto);
    try {
      await this.productRepository.save(newProduct);
      return newProduct;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException();
    }
    const result = await this.productRepository.remove(product);
    if (!result) {
      throw new NotFoundException();
    }
    result.id = product.id;
    return result;
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      id: updateProductDto.id,
    });
    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.description) {
      product.description = updateProductDto.description;
    }

    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }

    if (updateProductDto.category) {
      product.category = updateProductDto.category;
    }

    try {
      await this.productRepository.save(product);
      return product;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
