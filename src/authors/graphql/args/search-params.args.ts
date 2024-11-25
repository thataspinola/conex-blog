import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsNumber, IsOptional, IsString, Min } from 'class-validator'

@ArgsType()
export class SearchParamsArgs {
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  page?: number

  @IsNumber()
  @Min(1)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  perPage?: number

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  sort?: string

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  sortDir?: 'asc' | 'desc'

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  filter?: string
}
