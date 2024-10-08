import { DatabaseModule } from '@/database/database.module'
import { PrismaService } from '@/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { PostsPrismaRepository } from './repositories/post-prisma.repository'
import { CreatePostService } from './services/create-post.service'
import { AuthorsPrismaRepository } from '@/authors/repositories/authors-prisma.repository'
import { GetPostService } from './services/get-post.service'
import { PublishPostService } from './services/publish-post.service'
import { UnpublishPostService } from './services/unpublish-post.service'
import { PostsResolver } from './graphql/resolvers/posts.resolver'
import { GetAuthorService } from '@/authors/services/get-author.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    PostsResolver,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'PostsRepository',
      useFactory: (prismaService: PrismaService) => {
        return new PostsPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'AuthorsRepository',
      useFactory: (prismaService: PrismaService) => {
        return new AuthorsPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreatePostService.Service,
      useFactory: (
        postsRepository: PostsPrismaRepository,
        authorsRepository: AuthorsPrismaRepository,
      ) => {
        return new CreatePostService.Service(postsRepository, authorsRepository)
      },
      inject: ['PostsRepository', 'AuthorsRepository'],
    },
    {
      provide: GetPostService.Service,
      useFactory: (postsRepository: PostsPrismaRepository) => {
        return new GetPostService.Service(postsRepository)
      },
      inject: ['PostsRepository'],
    },
    {
      provide: PublishPostService.Service,
      useFactory: (postsRepository: PostsPrismaRepository) => {
        return new PublishPostService.Service(postsRepository)
      },
      inject: ['PostsRepository'],
    },
    {
      provide: UnpublishPostService.Service,
      useFactory: (postsRepository: PostsPrismaRepository) => {
        return new UnpublishPostService.Service(postsRepository)
      },
      inject: ['PostsRepository'],
    },
    {
      provide: GetAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new GetAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsRepository'],
    },
  ],
})
export class PostsModule {}
