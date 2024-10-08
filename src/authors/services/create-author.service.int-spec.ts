import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/errors/not-found-error'
import { AuthorDataBuilder } from '../helpers/author-data-builder'
import { AuthorsPrismaRepository } from '../repositories/authors-prisma.repository'
import { CreateAuthorService } from './create-author.service'
import { ConflictError } from '@/shared/errors/conflict-error'
import { BadRequestError } from '@/shared/errors//bad-request-errors'

describe('CreateAuthorService Integration Tests', () => {
  let module: TestingModule
  let repository: AuthorsPrismaRepository
  let service: CreateAuthorService.Service
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new AuthorsPrismaRepository(prisma as any)
    service = new CreateAuthorService.Service(repository)
  })

  beforeEach(async () => {
    await prisma.author.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should create a author', async () => {
    const data = AuthorDataBuilder({})

    const author = await service.execute(data)

    expect(author.id).toBeDefined()
    expect(author.createdAt).toBeInstanceOf(Date)
    expect(author).toMatchObject(data)
  })

  test('should not be able to create with same email twice', async () => {
    const data = AuthorDataBuilder({ email: 'a@a.com' })
    await service.execute(data)

    await expect(() => service.execute(data)).rejects.toBeInstanceOf(
      ConflictError,
    )
  })

  test('should throws error when name not provided', async () => {
    const data = AuthorDataBuilder({})
    data.name = null
    await expect(() => service.execute(data)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  test('should throws error when email not provided', async () => {
    const data = AuthorDataBuilder({})
    data.email = null
    await expect(() => service.execute(data)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})
