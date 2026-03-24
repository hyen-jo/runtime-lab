const { Router } = require("express");
const validate = require("../middleware/validate");
const {
  createTodoSchema,
  updateTodoSchema,
} = require("../schemas/todo.schema");

const router = Router();

// 간단한 할 일 데이터 (초기값)
let todos = [{ id: 1, title: "운동하기", completed: false }];

/**
 * @openapi
 * /api/todos:
 *   get:
 *     operationId: getTodos
 *     tags: [Todo]
 *     summary: Get all todos
 *     description: 등록된 모든 할 일을 배열로 반환합니다.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/", (req, res) => {
  res.json(todos);
});

/**
 * @openapi
 * /api/todos/add:
 *   post:
 *     operationId: addTodo
 *     tags: [Todo]
 *     summary: Add a todo
 *     description: 새로운 할 일을 생성합니다. title은 필수값입니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 */
router.post("/add", validate(createTodoSchema), (req, res) => {
  const { title, description } = req.body;

  const newTodo = {
    id: todos.length + 1,
    title,
    description,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

/**
 * @openapi
 * /api/todos/{id}:
 *   patch:
 *     operationId: updateTodo
 *     tags: [Todo]
 *     summary: Update a todo
 *     description: 특정 할 일의 완료 상태를 수정합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.patch("/:id", validate(updateTodoSchema), (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).send();

  todo.completed = req.body.completed;
  res.json(todo);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) return res.status(404).send();

  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
