module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
};
