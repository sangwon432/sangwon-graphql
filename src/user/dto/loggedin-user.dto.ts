import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoggedUserDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
