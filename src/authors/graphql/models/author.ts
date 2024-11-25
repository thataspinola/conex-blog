import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType('Author')
export class Author {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  createdAt: Date
}
