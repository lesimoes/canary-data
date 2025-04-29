const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CIK Search',
    description: 'API CIK Search',
  },
  host: 'localhost:3000/api',
  servers: [{ url: "http://localhost:3000/api" }],
};

const outputFile = './swagger-output.json';
const routes = ['src/config/routes.ts'];


swaggerAutogen(outputFile, routes, doc);
