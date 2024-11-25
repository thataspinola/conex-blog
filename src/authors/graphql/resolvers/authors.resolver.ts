import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ListAuthorsService } from '@/authors/services/list-authors.service'
import { Inject } from '@nestjs/common'
import { SearchParamsArgs } from '../args/search-params.args'
import { SearchAuthorsResult } from '../models/search-authors.result'
import { CreateAuthorService } from '@/authors/services/create-author.service'
import { Author } from '../models/author'
import { CreateAuthorInput } from '../inputs/create-author.input'
import { GetAuthorService } from '@/authors/services/get-author.service'
import { AuthorIdArgs } from '../args/author-id.args'
import { UpdateAuthorService } from '@/authors/services/update-authors.service'
import { UpdateAuthorInput } from '../inputs/update-author.input'
import { DeleteAuthorService } from '@/authors/services/delete-author.service'

@Resolver(() => SearchAuthorsResult)
export class AuthorsResolver {
  @Inject(ListAuthorsService.Service)
  private listAuthorService: ListAuthorsService.Service

  @Query(() => SearchAuthorsResult)
  async authors(
    @Args() { page, perPage, sort, sortDir, filter }: SearchParamsArgs,
  ) {
    const list = await this.listAuthorService.execute({
      page,
      perPage,
      sort,
      sortDir,
      filter,
    })

    return list
  }

  @Inject(CreateAuthorService.Service)
  private createAuthorService: CreateAuthorService.Service

  @Mutation(() => Author)
  async createAuthor(@Args('data') data: CreateAuthorInput) {
    return this.createAuthorService.execute(data)
  }

  @Inject(GetAuthorService.Service)
  private getAuthorService: GetAuthorService.Service

  @Query(() => Author)
  async getAuthorById(@Args() { id }: AuthorIdArgs) {
    return this.getAuthorService.execute({ id })
  }

  @Inject(UpdateAuthorService.Service)
  private updateAuthorService: UpdateAuthorService.Service

  @Mutation(() => Author)
  async updateAuthor(
    @Args() { id }: AuthorIdArgs,
    @Args('data') data: UpdateAuthorInput,
  ) {
    return this.updateAuthorService.execute({ id, ...data })
  }

  @Inject(DeleteAuthorService.Service)
  private deleteAuthorService: DeleteAuthorService.Service

  @Mutation(() => Author)
  async deleteAuthor(@Args() { id }: AuthorIdArgs) {
    return this.deleteAuthorService.execute({ id })
  }
}
