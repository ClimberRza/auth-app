import { getRandomQuoteId } from '.'

describe('generateToken', () => {
  test('Is defined', () => {
    expect(getRandomQuoteId(3)).toBeDefined()
  })
  test('Is more than 0', () => {
    expect(getRandomQuoteId(3)).toBeGreaterThan(0)
  })
  test('Is less than number in parameter', () => {
    expect(getRandomQuoteId(3)).toBeLessThan(3)
  })
})