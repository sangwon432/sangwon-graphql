import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTermsDto {
  @Field()
  personalInfo: boolean;

  @Field()
  agreeOfTerms: boolean;
}
