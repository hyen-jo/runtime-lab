const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * @openapi
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 */

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Todo API", version: "1.0.0" },
    servers: [{ url: "http://localhost:5001" }],
  },
  apis: ["./src/swagger.js", "./src/routes/*.js"],
});

const setupSwagger = (app) => {
  app.get("/api-docs-json", (_req, res) => res.json(swaggerSpec));
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: { syntaxHighlight: { theme: "agate" } },
      customCss: ":root { color-scheme: light only; }",
    }),
  );
};

module.exports = setupSwagger;
