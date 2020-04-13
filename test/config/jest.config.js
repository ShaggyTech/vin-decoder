module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/layouts/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/store/**/*.vue'
  ],
  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  rootDir: '../../',
  setupFiles: ['<rootDir>/test/config/jest.setup.js'],
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.js?$': require.resolve('babel-jest'),
    '^.+\\.ts?$': require.resolve('ts-jest'),
    '.*\\.(vue)$': require.resolve('vue-jest'),
    'vee-validate/dist/rules': require.resolve('babel-jest')
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vee-validate/dist/rules)'
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.nuxt/',
    '<rootDir>/coverage/',
    '<rootDir>/docs/',
    '<rootDir>/bin/'
  ]
};
