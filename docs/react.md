# React 심화 학습 체크리스트

## 1. 렌더링 이해

- [ ] 모든 컴포넌트에 console.log("render") 찍어보기
- [ ] state 변경 시 어떤 컴포넌트까지 리렌더되는지 확인
- [ ] 부모 state 변경 → 자식 렌더 여부 확인
- [ ] 리스트에서 특정 item만 바꿔도 전체가 렌더되는지 확인

---

## 2. useEffect 완전 이해

- [ ] mount / update / unmount 타이밍 로그 찍기
- [ ] dependency 배열 [] / [value] / 없음 차이 실험
- [ ] cleanup 함수 실행 타이밍 확인
- [ ] 잘못된 dependency로 무한 루프 만들어보기

---

## 3. closure 문제 체험 (핵심🔥)

- [ ] setInterval 안에서 state 값 안 바뀌는 문제 만들기
- [ ] 왜 그런지 설명해보기
- [ ] 해결 방법 적용해보기 (dependency / ref 등)

---

## 4. props vs state 흐름 이해

- [ ] 부모 → 자식 props 전달 구조 만들기
- [ ] props 바뀔 때 자식 렌더 확인
- [ ] state를 어디에 두는 게 맞는지 고민해보기
- [ ] lifting state up 연습

---

## 5. useCallback / useMemo 체감

- [ ] 일반 함수 vs useCallback 차이 확인
- [ ] 불필요한 렌더 줄이는지 실험
- [ ] useMemo로 계산 최적화 해보기
- [ ] 언제 쓰는 게 맞는지 기준 세우기

---

## 6. React.memo 이해

- [ ] TodoItem에 React.memo 적용해보기
- [ ] 적용 전/후 렌더 횟수 비교
- [ ] props 변경 없을 때 렌더 막히는지 확인

---

## 7. 리스트 렌더링 최적화

- [ ] key 잘못 줬을 때 문제 만들어보기
- [ ] index key vs id key 차이 이해
- [ ] 리스트에서 일부만 업데이트되게 만들기

---

## 8. 이벤트 핸들러 구조 이해

- [ ] onClick={() => fn()} vs onClick={fn} 차이 이해
- [ ] 함수가 매번 새로 생성되는지 확인
- [ ] useCallback으로 개선해보기

---

## 9. 상태 위치 설계

- [ ] Todo 상태를 부모 vs 자식에 두기 비교
- [ ] 어떤 구조가 더 좋은지 이유 설명해보기
- [ ] 상태 최소화 원칙 적용해보기

---

## 10. 실제 Todo 프로젝트 적용

- [ ] TodoItem 렌더 로그 찍기
- [ ] 불필요한 렌더 찾기
- [ ] memo + callback 적용해서 최적화
- [ ] 필터/검색 상태 추가해보기
- [ ] 상태 구조 리팩토링

---

## 🔥 최종 목표

- [ ] "왜 렌더가 발생하는지" 설명할 수 있다
- [ ] "왜 이 훅을 써야 하는지" 설명할 수 있다
- [ ] "이 구조가 좋은 이유"를 말할 수 있다
