import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType('CreateAuthorInput')
export class CreateAuthorInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string
}
