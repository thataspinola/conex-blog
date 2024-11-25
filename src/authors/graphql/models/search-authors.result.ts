import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Author } from './author'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

@ObjectType('SearchAuthorsResult')
export class SearchAuthorsResult {
  @IsArray()
  @Field(() => [Author])
  items: Author[]

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  currentPage: number

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  perPage: number

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  lastPage: number

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  total: number
}
