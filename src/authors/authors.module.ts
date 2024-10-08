import { Module } from '@nestjs/common'
import { AuthorsResolver } from './graphql/resolvers/authors.resolver'
import { DatabaseModule } from '@/database/database.module'
import { PrismaService } from '@/database/prisma/prisma.service'
import { AuthorsPrismaRepository } from './repositories/authors-prisma.repository'
import { ListAuthorsService } from './services/list-authors.service'
import { GetAuthorService } from './services/get-author.service'
import { CreateAuthorService } from './services/create-author.service'
import { UpdateAuthorService } from './services/update-author.service'
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
      provide: 'AuthorsRepository',
      useFactory: (prisma: PrismaService) => {
        return new AuthorsPrismaRepository(prisma)
      },
      inject: ['PrismaService'],
    },
    {
      provide: ListAuthorsService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new ListAuthorsService.Service(authorsRepository)
      },
      inject: ['AuthorsRepository'],
    },
    {
      provide: GetAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new GetAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsRepository'],
    },
    {
      provide: CreateAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new CreateAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsRepository'],
    },
    {
      provide: UpdateAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new UpdateAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsRepository'],
    },
    {
      provide: DeleteAuthorService.Service,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new DeleteAuthorService.Service(authorsRepository)
      },
      inject: ['AuthorsRepository'],
    },
  ],
})
export class AuthorsModule {}
