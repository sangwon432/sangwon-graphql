import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/base.entity';
import { CategoriesEnum } from './categories.enum';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  price: number;

  @Column()
  @Field()
  category: CategoriesEnum;

  // create, update, and delete dates
}
