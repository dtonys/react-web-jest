module.exports = {
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: './setupJest.js',
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
