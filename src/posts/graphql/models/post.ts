import { Author } from '@/authors/graphql/models/author'
import { Field, ObjectType } from '@nestjs/graphql'
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

@ObjectType('Post')
export class Post {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  slug: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  content: string

  authorId: string

  @IsOptional()
  @Field(() => Author, { nullable: true })
  author?: Author

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  published?: boolean

  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  createdAt: Date
}
