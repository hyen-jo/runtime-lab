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
 *     PaginatedTodos:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *         page:
 *           type: integer
 *         limit:
 *           type: integer
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Todo'
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
