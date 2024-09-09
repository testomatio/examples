// import dotenv from 'dotenv'
// dotenv.config()

export default {
  // ./ is required before the path;
  reporters: ['default', ['./node_modules/@testomatio/reporter/cjs/lib/adapter/jest.js', { apiKey: process.env.TESTOMATIO }]],
  transform: {},
};

// export default { transform: {} }