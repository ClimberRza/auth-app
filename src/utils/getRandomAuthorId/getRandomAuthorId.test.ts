import { getRandomAuthorId } from '.'

describe('generateToken', () => {
  test('Is defined', () => {
    expect(getRandomAuthorId()).toBeDefined()
  })
  test('Is more than 0', () => {
    expect(getRandomAuthorId()).toBeGreaterThan(0)
  })
  test('Is less than 4', () => {
    expect(getRandomAuthorId()).toBeLessThan(4)
  })
})