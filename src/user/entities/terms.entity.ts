import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('terms')
export class Terms {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @OneToOne(() => User, (user) => user.terms)
  public user?: User;

  @Column()
  @Field()
  personalInfo: boolean;

  @Column()
  @Field()
  agreeOfTerms: boolean;
}
