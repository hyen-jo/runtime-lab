# Backend 로드맵

## Level 0 — Express 기초
- [x] Express CRUD (메모리 배열)
- [x] 라우터 분리
- [ ] zod 요청 검증 — 새 API에 직접 스키마 작성해보기
- [ ] Swagger 문서화 — 새 API에 직접 주석 작성해보기
- [ ] JS 배열 메서드 심화 → [js.md](js.md) 참고

## Level 1 — DB 연동
- [ ] PostgreSQL 설치 및 연결
- [ ] Prisma 세팅 (스키마, 마이그레이션)
- [ ] Todo 테이블 설계
- [ ] 배열 → Prisma로 CRUD 전환
- [ ] 1:N 관계 (User → Todo)

## Level 2 — 인증/인가
- [ ] User 모델 (회원가입, 로그인)
- [ ] 비밀번호 해싱 (bcrypt)
- [ ] JWT 발급 (access token + refresh token)
- [ ] 인증 미들웨어 (로그인 필수 API 보호)
- [ ] 인가 (본인 Todo만 접근)

## Level 3 — 실무 패턴
- [ ] 공통 에러 핸들링 미들웨어
- [ ] 커스텀 에러 클래스 (NotFound, BadRequest 등)
- [ ] 계층 분리 (controller → service → repository)
- [ ] 환경 변수 분리 (.env, config)
- [ ] 로깅 (winston)

## Level 4 — 배포 + 운영
- [ ] Docker 컨테이너화
- [ ] CI/CD (GitHub Actions)
- [ ] 클라우드 배포 (AWS EC2 or Railway)
- [ ] 헬스체크 API

## Level 5 — 차별화
- [ ] 테스트 (Jest + Supertest)
- [ ] 캐싱 (Redis)
- [ ] 파일 업로드 (S3)
- [ ] WebSocket (실시간 알림)
