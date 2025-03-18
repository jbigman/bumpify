import { jest } from '@jest/globals'

export const parseDiff =
  jest.fn<typeof import('../src/parseDiff.js').parseDiff>()
