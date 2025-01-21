import { Field, InputType } from '@nestjs/graphql';
import { Terms } from '../entities/terms.entity';
import { CreateTermsDto } from './create-terms.dto';

@InputType()
export class CreateUserDto {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => CreateTermsDto, { nullable: true })
  terms?: CreateTermsDto;
}
