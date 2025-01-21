import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class TokenResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
