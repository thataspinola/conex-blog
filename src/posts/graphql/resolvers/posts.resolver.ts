import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Post } from '../models/post'
import { Inject } from '@nestjs/common'
import { CreatePostInput } from '../inputs/create-post.input'
import { CreatePostService } from '@/posts/services/create-post.service'
import { GetAuthorService } from '@/authors/services/get-author.service'
import { GetPostService } from '@/posts/services/get-post.service'
import { PostIdArgs } from '../args/post-id.args'
import { PublishPostService } from '@/posts/services/publish-post.service'
import { UnpublishPostService } from '@/posts/services/unpublish-post.service'

@Resolver(() => Post)
export class PostsResolver {
  @Inject(CreatePostService.Service)
  private createPostService: CreatePostService.Service

  @Mutation(() => Post)
  async createPost(@Args('data') data: CreatePostInput) {
    return this.createPostService.execute(data)
  }

  @Inject(GetAuthorService.Service)
  private getAuthorService: GetAuthorService.Service

  @ResolveField()
  author(@Parent() post: Post) {
    return this.getAuthorService.execute({ id: post.authorId })
  }

  @Inject(GetPostService.Service)
  private getPostService: GetPostService.Service

  @Query(() => Post)
  async getPostById(@Args() { id }: PostIdArgs) {
    return this.getPostService.execute({ id })
  }

  @Inject(PublishPostService.Service)
  private publishPostService: PublishPostService.Service

  @Mutation(() => Post)
  async publishPost(@Args() { id }: PostIdArgs) {
    return this.publishPostService.execute({ id })
  }

  @Inject(UnpublishPostService.Service)
  private unpublishPostService: UnpublishPostService.Service

  @Mutation(() => Post)
  async unpublishPost(@Args() { id }: PostIdArgs) {
    return this.unpublishPostService.execute({ id })
  }
}
