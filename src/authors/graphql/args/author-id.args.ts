import { ArgsType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ArgsType()
export class AuthorIdArgs {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  id: string
}
