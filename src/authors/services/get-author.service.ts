import { AuthorOutput } from '../dto/author.output'
import { AuthorsPrismaRepository } from '../repositories/authors-prisma.repository'

export namespace GetAuthorService {
  export type Input = {
    id: string
  }

  export class Service {
    constructor(private authorsRepository: AuthorsPrismaRepository) {}

    async execute(input: Input): Promise<AuthorOutput> {
      const { id } = input
      const author = await this.authorsRepository.findById(id)
      return author
    }
  }
}
