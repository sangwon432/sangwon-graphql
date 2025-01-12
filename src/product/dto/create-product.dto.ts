import { Field, InputType } from '@nestjs/graphql';
import { CategoriesEnum } from '../entities/categories.enum';

@InputType()
export class CreateProductDto {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  category: CategoriesEnum;
}
