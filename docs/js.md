# JS 배열 메서드 연습 목록

## 기본 CRUD

- [x] GET /api/todos — 전체 조회
- [x] POST /api/todos/add — 할 일 추가 (`push`)
- [x] PATCH /api/todos/:id — 할 일 수정 (`find`)
- [x] DELETE /api/todos/:id — 할 일 삭제 (`findIndex` + `splice`)

## 심화 연습

- [x] GET /api/todos/:id — 단건 조회 (`find`)
- [ ] GET /api/todos?completed=true — 필터 (`filter`)
- [ ] GET /api/todos?keyword=운동 — 검색 (`filter` + `includes`)
- [ ] GET /api/todos?sort=id&order=desc — 정렬 (`sort`)
- [ ] GET /api/todos?page=1&limit=5 — 페이지네이션 (`slice`)
- [ ] POST /api/todos/add — 중복 체크 (`some`)
- [ ] GET /api/todos/stats — 통계 (`reduce`)
- [ ] GET /api/todos/summary — 응답 가공 (`map`)
