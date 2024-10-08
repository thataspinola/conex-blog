import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/errors/not-found-error'
import { AuthorsPrismaRepository } from '../repositories/authors-prisma.repository'
import { GetAuthorService } from './get-author.service'
import { AuthorDataBuilder } from '../helpers/author-data-builder'

describe('GetAuthorService Integration Tests', () => {
  let module: TestingModule
  let repository: AuthorsPrismaRepository
  let service: GetAuthorService.Service
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new AuthorsPrismaRepository(prisma as any)
    service = new GetAuthorService.Service(repository)
  })

  beforeEach(async () => {
    await prisma.author.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not found', async () => {
    await expect(() =>
      service.execute({ id: '796c5a25-1d3b-4228-9a75-06f416c6e218' }),
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  test('should be able to get author by id', async () => {
    const data = AuthorDataBuilder({})
    const author = await prisma.author.create({ data })
    const result = await service.execute({ id: author.id })
    expect(result).toStrictEqual(author)
  })
})
