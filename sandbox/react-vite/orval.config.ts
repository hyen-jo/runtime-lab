import { defineConfig } from "orval";

export default defineConfig({
  todos: {
    input: "http://localhost:5001/api-docs-json",
    output: {
      target: "./src/api/generated.ts",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/fetcher.ts",
          name: "customFetcher",
        },
      },
    },
  },
});
