import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { AuthorsPrismaRepository } from '../repositories/authors-prisma.repository'
import { UpdateAuthorService } from './update-author.service'
import { AuthorDataBuilder } from '../helpers/author-data-builder'
import { BadRequestError } from '@/shared/errors/bad-request-errors'
import { ConflictError } from '@/shared/errors/conflict-error'

describe('UpdateAuthorService Integration Tests', () => {
  let module: TestingModule
  let repository: AuthorsPrismaRepository
  let service: UpdateAuthorService.Service
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new AuthorsPrismaRepository(prisma as any)
    service = new UpdateAuthorService.Service(repository)
  })

  beforeEach(async () => {
    await prisma.author.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not provided', async () => {
    const data = {
      id: null,
    }
    await expect(() => service.execute(data)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  test('should throws an error when provided email is duplicated', async () => {
    const data = AuthorDataBuilder({ email: 'a@a.com' })
    await prisma.author.create({ data })
    const secondAuthor = await prisma.author.create({
      data: AuthorDataBuilder({}),
    })

    secondAuthor.email = 'a@a.com'
    await expect(() => service.execute(secondAuthor)).rejects.toBeInstanceOf(
      ConflictError,
    )
  })

  test('should be able to update author', async () => {
    const data = AuthorDataBuilder({})
    const author = await prisma.author.create({ data })

    const result = await service.execute({
      ...author,
      name: 'Name updated',
      email: 'a@a.com',
    })
    expect(result.name).toEqual('Name updated')
    expect(result.email).toEqual('a@a.com')
  })
})
