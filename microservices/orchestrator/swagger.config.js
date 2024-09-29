const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Orchestrator API',
      version: '1.0.0',
      description: 'API para gestionar recibos de órdenes y productos favoritos de usuarios',
      contact: {
        name: 'Desarrollador',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
  },
  apis: ['index.js'], // Archivos con las anotaciones de Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
