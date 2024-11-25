import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/database/database.module'
import { AuthorsResolver } from './graphql/resolvers/authors.resolver'
import { PrismaService } from '@/database/prisma/prisma.service'
import { AuthorsPrismaRepository } from './repositories/authors-prisma.repository'
import { ListAuthorsService } from './services/list-authors.service'
import { GetAuthorService } from './services/get-author.service'
import { CreateAuthorService } from './services/create-author.service'
import { UpdateAuthorService } from './services/update-authors.service'
import { DeleteAuthorService } from './services/delete-author.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthorsResolver,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'AuthorsPrismaRepository',
      useFactory: (prisma: PrismaService) => {
        return new AuthorsPrismaRepository(prisma)
      },
      inject: ['AuthorsPrismaRepository'],
    },
    {
      provide: ListAuthorsService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new ListAuthorsService.Service(authorsRepository)
      },
      inject: ['AuthorsPrismaRepository'],
    },
    {
      provide: GetAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new GetAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsPrismaRepository'],
    },
    {
      provide: CreateAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new CreateAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsPrismaRepository'],
    },
    {
      provide: UpdateAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new UpdateAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsPrismaRepository'],
    },
    {
      provide: DeleteAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new DeleteAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsPrismaRepository'],
    },
  ],
})
export class AuthorsModule {}
