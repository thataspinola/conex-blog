import { Test, TestingModule } from '@nestjs/testing'
import { AppResolver } from './app.resolver'

describe('AppController', () => {
  let appController: AppResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppResolver],
      providers: [AppResolver],
    }).compile()

    appController = app.get<AppResolver>(AppResolver)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.hello()).toBe('Hello World!')
    })
  })
})
