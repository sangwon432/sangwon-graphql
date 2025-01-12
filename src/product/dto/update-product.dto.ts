import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriesEnum } from '../entities/categories.enum';

@InputType()
export class UpdateProductDto {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: 0 })
  price?: number;

  @Field({ defaultValue: CategoriesEnum.IT })
  category?: CategoriesEnum;
}
