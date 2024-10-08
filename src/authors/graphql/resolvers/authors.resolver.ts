import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Author } from '../models/author.model'
import { Inject } from '@nestjs/common'
import { ListAuthorsService } from '@/authors/services/list-authors.service'
import { SearchParamsArgs } from '../args/search-params-args'
import { SearchAuthorsResult } from '../models/search-authors.result'
import { CreateAuthorService } from '@/authors/services/create-author.service'
import { CreateAuthorInput } from '../inputs/create-author.input'
import { GetAuthorService } from '@/authors/services/get-author.service'
import { AuthorIdArgs } from '../args//author-is.args'
import { UpdateAuthorService } from '@/authors/services/update-author.service'
import { UpdateAuthorInput } from '../inputs/update-author.input'
import { DeleteAuthorService } from '@/authors/services/delete-author.service'

@Resolver(() => Author)
export class AuthorsResolver {
  @Inject(ListAuthorsService.Service)
  private listAuthorService: ListAuthorsService.Service

  @Inject(CreateAuthorService.Service)
  private createAuthorService: CreateAuthorService.Service

  @Inject(GetAuthorService.Service)
  private getAuthorService: GetAuthorService.Service

  @Inject(UpdateAuthorService.Service)
  private updateAuthorService: UpdateAuthorService.Service

  @Inject(DeleteAuthorService.Service)
  private deleteAuthorService: DeleteAuthorService.Service

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

  @Query(() => Author)
  async getAuthorById(@Args() { id }: AuthorIdArgs) {
    return this.getAuthorService.execute({ id })
  }

  @Mutation(() => Author)
  createAuthor(@Args('data') data: CreateAuthorInput) {
    return this.createAuthorService.execute(data)
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args() { id }: AuthorIdArgs,
    @Args('data') data: UpdateAuthorInput,
  ) {
    return this.updateAuthorService.execute({ id, ...data })
  }

  @Mutation(() => Author)
  async deleteAuthor(@Args() { id }: AuthorIdArgs) {
    return this.deleteAuthorService.execute({ id })
  }
}
