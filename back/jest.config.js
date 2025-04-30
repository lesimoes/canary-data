/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};