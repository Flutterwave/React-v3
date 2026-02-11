module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/test', '<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts', '**/*.spec.tsx', '**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/types.ts',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Flutterwave React v3 Test Report',
        outputPath: './test-report/index.html',
        includeFailureMsg: true,
        includeConsoleLog: false,
        theme: 'darkTheme',
      },
    ],
  ],
};
