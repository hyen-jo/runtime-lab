# Backend

## 실행

```bash
cd backend
node src/app.js
```

- 포트: `5001` (macOS AirPlay가 5000 사용)
- Swagger UI: http://localhost:5001/api-docs
- Swagger JSON: http://localhost:5001/api-docs-json

## 서버 재시작

```bash
kill $(lsof -ti :5001); node src/app.js
```

## API 목록

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/todos` | 할 일 목록 조회 |
| POST | `/api/todos/add` | 할 일 추가 |
| PATCH | `/api/todos/:id` | 할 일 수정 |

## Swagger 설정

- `swagger-jsdoc`: JSDoc 주석에서 OpenAPI 스펙 자동 생성
- `swagger-ui-express`: Swagger UI 제공
- 각 엔드포인트에 `tags`로 그룹 분류 (예: `Todo`, `Schedule`)

### 새 API 추가 시 Swagger 작성법

전부 외울 필요 없음. 기존 API 주석을 복사 → 아래 항목만 수정.

| 바꿀 항목 | 예시 |
|-----------|------|
| 경로 | `/api/todos/{id}` |
| method | `get`, `post`, `patch`, `delete` |
| operationId | `getTodoById` |
| tags | `[Todo]` |
| summary | `Get a todo by id` (영어) |
| description | 한글 설명 |
| parameters | path/query 파라미터 |
| requestBody | 요청 body 스키마 |
| responses | 상태코드 + description (영어: OK, Created, Not Found 등) |

### 작성 규칙

- summary, response description → 영어
- description (API 설명) → 한글
- 새 스키마가 필요하면 `swagger.js`의 components에 추가

## Orval 연동 (프론트엔드)

백엔드 Swagger 스펙 기반으로 React Query 훅 자동 생성.

```bash
# sandbox/react-vite 에서
npm run generate
```

- 설정: `orval.config.ts`
- 생성 경로: `src/api/generated.ts`
- 생성되는 훅: `useGetTodos`, `useAddTodo`, `useUpdateTodo`

## Vite Proxy

프론트엔드에서 `/api/...` 호출 시 백엔드로 프록시.

```ts
// vite.config.ts
server: {
  proxy: {
    '/api': 'http://localhost:5001',
  },
}
```
