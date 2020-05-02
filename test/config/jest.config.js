module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.(vue|ts|js)',
    '<rootDir>/layouts/**/*.(vue|ts|js)',
    '<rootDir>/pages/**/*.(vue|ts|js)',
    '<rootDir>/compositions/**/*.(ts|js)',
    '<rootDir>/middleware/**/*.(ts|js)',
    '<rootDir>/store/**/*.(ts|js)',
    '<rootDir>/utils/**/*.(ts|js)'
  ],
  coveragePathIgnorePatterns: ['<rootDir>/store/plugins/'],
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
    '<rootDir>/node_modules/(?!(' +
      'vee-validate/dist/rules' +
      '|nuxt-typed-vuex/lib' +
      '|typed-vuex/lib' +
      '))'
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.nuxt/',
    '<rootDir>/coverage/',
    '<rootDir>/docs/',
    '<rootDir>/bin/'
  ]
};
