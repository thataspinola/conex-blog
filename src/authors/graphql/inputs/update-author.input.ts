import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType('UpdateAuthorInput')
export class UpdateAuthorInput {
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string

  @IsString()
  @Field(() => String, { nullable: true })
  email?: string
}
