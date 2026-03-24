BrowserRouter :
React Router의 컨텍스트를 제공함
Routes, Route, Link 등은 BrowserRouter 안에서만 동작함
앱 전체를 감싸서 라우팅 기능을 활성화 함,

AnimatePresence로 감싸면, 베이지 바뀔때 할때 부드럽게 전환이 된다.
<AnimatePresence mode="wait">
<Routes>
<Route>
</Route>
</Routes>
</AnimatePresence>

onChange(newValue); , onChange?.(newValue) 의 차이점
onChange가 없을 때 에러가 나냐 / 안 나냐

onChange(newValue)
• 무조건 함수라고 가정하고 실행
• 만약 onChange가 undefined면 ❌
👉 바로 에러 터짐

onChange?.(newValue)
• onChange가 있을 때만 실행
• 없으면 그냥 아무 일도 안 함

👉 안전하게 동작 (optional chaining)
