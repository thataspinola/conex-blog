import { Test, TestingModule } from '@nestjs/testing'
import { AuthorsPrismaRepository } from '../repositories/authors-prisma.repository'
import { DeleteAuthorService } from './delete-author.service'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/errors/not-fount-error'
import { AuthorDataBuilder } from '../helpers/author-data-builder'

describe('DeleteAuthorService Integration Tests', () => {
  let module: TestingModule
  let repository: AuthorsPrismaRepository
  let usecase: DeleteAuthorService.Service
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new AuthorsPrismaRepository(prisma as any)
    usecase = new DeleteAuthorService.Service(repository)
  })

  beforeEach(async () => {
    await prisma.author.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not found', async () => {
    await expect(() =>
      usecase.execute({ id: '796c5a25-1d3b-4228-9a75-06f416c6e218' }),
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  test('should delete a author', async () => {
    const data = AuthorDataBuilder({})
    const author = await prisma.author.create({ data })
    const result = await usecase.execute({ id: author.id })
    expect(result).toStrictEqual(author)
    const authors = await prisma.author.findMany()
    expect(authors).toHaveLength(0)
  })
})
