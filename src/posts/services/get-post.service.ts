import { PostOutput } from '../dto/post-output'
import { PostsPrismaRepository } from '../repositories/post-prisma.repository'

export namespace GetPostService {
  export type Input = {
    id: string
  }

  export type Output = PostOutput

  export class Service {
    constructor(private postsRepository: PostsPrismaRepository) {}

    async execute(input: Input): Promise<Output> {
      const post = await this.postsRepository.findById(input.id)
      return post as PostOutput
    }
  }
}
