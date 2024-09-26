import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description:
        "API documentation for the service, including User, UserProfile, and FavProduct resources",
    },
  },
  apis: ["./server/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
