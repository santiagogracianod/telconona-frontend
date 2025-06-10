module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  roots: [
    '<rootDir>/tests'      // <-- aquí le dices que busque solo en tests/
  ],
  moduleFileExtensions: ['js','jsx','ts','tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '<rootDir>/tests/**/*.test.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.{js,jsx,ts,tsx}',   // cubre todo components/
    '!<rootDir>/components/ui/**'                   // excluye ui/
  ],
  
  
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text']
}
