import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { Query } from '@nestjs/graphql';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string): Promise<Product> {
    return await this.productService.getProduct(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductDto') createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string): Promise<Product> {
    return await this.productService.deleteProductById(id);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('updateProductDto') updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(updateProductDto);
  }
}
