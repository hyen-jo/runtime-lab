const { z } = require("zod");

const createTodoSchema = z.object({
  title: z.string().min(1, "title은 필수입니다"),
  description: z.string().optional(),
});

const updateTodoSchema = z.object({
  completed: z.boolean({ message: "completed는 boolean이어야 합니다" }),
});

module.exports = { createTodoSchema, updateTodoSchema };
