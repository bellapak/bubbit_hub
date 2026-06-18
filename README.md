# Bubbit Hub — Secure Brand Library Version

이번 버전은 기존 코드 안에서만 구조를 정리하면서 아래 문제를 함께 보완했습니다.

## 반영 사항

### 1. 브랜드 라이브러리 계층 정리
- 긴 브랜드 가이드 내용을 섹션별 아코디언 구조로 변경했습니다.
- 상단에 `READING MAP`을 추가해 처음 보는 직원도 읽는 순서를 알 수 있게 했습니다.
- 검색 시 관련 아코디언이 자동으로 열리도록 수정했습니다.

### 2. 로딩 개선
- 브랜드 라이브러리 이미지에 `loading="lazy"`, `decoding="async"`를 적용했습니다.
- 업로드 에셋 목록은 초기 렌더를 막지 않도록 idle 시점에 1회만 불러오도록 변경했습니다.
- 실시간 `onSnapshot` 대신 `getDocs + limit(24)` 방식으로 바꿔 첫 로딩 부담을 줄였습니다.

### 3. Google 로그인 오류 개선
- 로그인 실패 원인을 화면에 더 구체적으로 표시하도록 변경했습니다.
- 팝업 차단 시 redirect 로그인으로 재시도하도록 보완했습니다.
- 허용 계정은 `firebase.js`에 직접 쓰지 않고 `app.secrets.js`에서만 관리하도록 분리했습니다.

### 4. 보안 개선
- 개인 이메일 하드코딩을 제거했습니다.
- `app.secrets.example.js`와 `.gitignore`를 추가했습니다.
- 계정 관리 페이지에서 비밀번호 저장 기능을 제거했습니다.
- 기존 Firestore `accounts` 문서에 남은 `pw` 필드를 삭제하는 버튼을 추가했습니다.
- 동적 테이블 출력 일부에 HTML escape 처리를 추가해 스크립트 삽입 위험을 낮췄습니다.
- `firestore.rules` 예시를 추가했습니다.

## 적용 전 필수 작업

1. `app.secrets.example.js`를 복사해 `app.secrets.js`를 만듭니다.
2. `app.secrets.js`에 실제 허용 계정 또는 허용 도메인을 입력합니다.
3. Firebase Console에서 Google 로그인과 Authorized domains를 확인합니다.
4. Firestore Rules에 `firestore.rules` 내용을 실제 팀 계정 기준으로 수정해 배포합니다.
5. 기존 계정 관리 데이터에 비밀번호가 남아 있다면, 계정 관리 화면에서 `기존 비밀번호 필드 제거`를 실행합니다.

## 주요 파일

```txt
index.html
brandlibrary.html
brandlibrary.css
calender.html
promotion.html
cs.html
issue.html
data.html
account_issue.html
login.html
firebase.js
app.secrets.example.js
firestore.rules
style.css
layout.js
app.config.js
```

## 주의

Firebase config의 `apiKey`는 일반적인 프론트엔드 공개 식별자입니다. 하지만 데이터 접근 보안은 반드시 Firestore Rules로 막아야 합니다.
클라이언트 코드에 적힌 허용 계정 체크만으로는 보안이 완성되지 않습니다.
