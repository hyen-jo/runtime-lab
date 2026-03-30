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
 *     description: 등록된 모든 할 일을 배열로 반환합니다. 필터, 검색, 정렬을 지원합니다.
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: 완료 여부로 필터링
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: 제목 검색어
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [id, title, completed]
 *         description: 정렬 기준 필드
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: 정렬 방향
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedTodos'
 */
router.get("/todos", (req, res) => {
  const { completed, keyword, sort, order, page = 1, limit = 5 } = req.query;
  let result = [...todos];

  //완료
  if (completed !== undefined) {
    const isCompleted = completed === "true";
    result = result.filter((t) => t.completed === isCompleted);
  }

  // 검색어
  if (keyword) {
    result = result.filter((t) => t.title.includes(keyword));
  }

  // 정렬조회
  const allowedSortFields = ["id", "title", "completed", "createdAt"];
  const sortOrder = order === "desc" ? "desc" : "asc";

  if (sort && allowedSortFields.includes(sort)) {
    result.sort((a, b) => {
      if (a[sort] === b[sort]) {
        return 0;
      }

      if (sortOrder === "desc") {
        return a[sort] < b[sort] ? 1 : -1;
      } else {
        return a[sort] > b[sort] ? 1 : -1;
      }
    });
  }

  // 페이지네이션
  const pageNum = Number(page);
  const limitNum = Number(limit);

  if (
    Number.isNaN(pageNum) ||
    Number.isNaN(limitNum) ||
    pageNum < 1 ||
    limitNum < 1
  ) {
    return res.status(400).json({
      message: "page와 limit는 1 이상의 숫자여야 합니다.",
    });
  }

  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  const paginated = result.slice(start, end);

  return res.json({
    total: result.length,
    page: pageNum,
    limit: limitNum,
    data: paginated,
  });
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
router.patch("/todos/:id", validate(updateTodoSchema), (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).send();

  todo.completed = req.body.completed;
  res.json(todo);
});

/**
 * @openapi
 * /api/todos/{id}:
 *   delete:
 *     operationId: deleteTodo
 *     tags: [Todo]
 *     summary: Delete a todo
 *     description: 특정 할 일을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 */
router.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) return res.status(404).send();

  todos.splice(index, 1);
  res.status(204).send();
});

/**
 * @openapi
 * /api/todos/{id}:
 *   get:
 *     operationId: getTodoById
 *     tags: [Todo]
 *     summary: Get a todo by id
 *     description: id로 특정 할 일을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Not Found
 */
router.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json(todo);
});

module.exports = router;
