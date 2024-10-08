import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Post } from '../models/post.model'
import { Inject } from '@nestjs/common'
import { CreatePostService } from '@/posts/services/create-post.service'
import { CreatePostInput } from '../inputs/create-post.input'
import { GetAuthorService } from '@/authors/services/get-author.service'
import { GetPostService } from '@/posts/services/get-post.service'
import { PostIdArgs } from '../args/post-id.args'
import { PublishPostService } from '@/posts/services/publish-post.service'
import { UnpublishPostService } from '@/posts/services/unpublish-post.service'

@Resolver(() => Post)
export class PostsResolver {
  @Inject(CreatePostService.Service)
  private createPostService: CreatePostService.Service

  @Inject(GetAuthorService.Service)
  private getAuthorService: GetAuthorService.Service

  @Inject(PublishPostService.Service)
  private publishPostService: PublishPostService.Service

  @Inject(GetPostService.Service)
  private getPostService: GetPostService.Service

  @Inject(UnpublishPostService.Service)
  private unpublishPostService: UnpublishPostService.Service

  @Query(() => Post)
  async getPostById(@Args() { id }: PostIdArgs) {
    return this.getPostService.execute({ id })
  }

  @Mutation(() => Post)
  async createPost(@Args('data') data: CreatePostInput) {
    return this.createPostService.execute(data)
  }

  @Mutation(() => Post)
  async publishPost(@Args() { id }: PostIdArgs) {
    return this.publishPostService.execute({ id })
  }

  @Mutation(() => Post)
  async unpublishPost(@Args() { id }: PostIdArgs) {
    return this.unpublishPostService.execute({ id })
  }

  @ResolveField()
  author(@Parent() post: Post) {
    return this.getAuthorService.execute({ id: post.authorId })
  }
}
