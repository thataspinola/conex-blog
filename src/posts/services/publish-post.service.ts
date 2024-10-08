import { PostOutput } from '../dto/post-output'
import { PostsPrismaRepository } from '../repositories/post-prisma.repository'

export namespace PublishPostService {
  export type Input = {
    id: string
  }

  export type Output = PostOutput

  export class Service {
    constructor(private postsRepository: PostsPrismaRepository) {}

    async execute(input: Input): Promise<Output> {
      const post = await this.postsRepository.findById(input.id)

      post.published = true

      const postUpdated = await this.postsRepository.update(post)
      return postUpdated as PostOutput
    }
  }
}
