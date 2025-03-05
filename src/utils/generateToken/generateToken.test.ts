import { generateToken } from './generateToken';

describe('generateToken', () => {
  test('Is defined', () => {
    expect(generateToken()).toBeDefined()
  })
  test('Is 32 chars long', () => {
    expect(generateToken().length).toBe(32)
  })
  test('Is string', () => {
    expect(typeof generateToken()).toEqual('string')
  })
})