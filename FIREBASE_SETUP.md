# Bubbit Hub Google 로그인 세팅 가이드

## 1) Firebase Console에서 Google 로그인 켜기
Firebase Console → Authentication → Sign-in method → Google → 사용 설정 ON → 프로젝트 지원 이메일 선택 → 저장

## 2) Authorized domains 확인
Firebase Console → Authentication → Settings → Authorized domains에 아래 도메인이 있어야 합니다.

- localhost
- bubbit-hub.firebaseapp.com
- bubbit-hub.web.app
- 실제 배포 도메인

## 3) 접속 허용 계정 추가
`app-auth.js` 파일의 `allowedEmails` 배열에 접속 허용할 Google 이메일을 추가합니다.

```js
export const allowedEmails = [
  "bestfriendpakminji@gmail.com",
  "admin@bubbit.com",
  "member@bubbit.com"
];
```

## 4) Firestore Rules 적용
Firebase Console → Firestore Database → Rules에 `firestore.rules` 내용을 붙여넣고 Publish 합니다.

현재 rules는 로그인한 사용자 중 `allowedEmails`에 해당하는 계정만 읽기/쓰기가 가능합니다.

## 5) 배포 시 업로드할 파일
아래 파일은 같은 폴더에 있어야 합니다.

- app-auth.js
- login.html
- style.css
- index.html 등 전체 HTML 파일

## 6) 현재 구현된 기능
- Google 팝업 로그인
- 허용 이메일 화이트리스트
- 비허용 계정 차단 및 로그아웃
- 모든 내부 페이지 로그인 보호
- 상단 우측 로그인 이메일 표시
- 로그아웃 버튼
- 로그인 실패 사유 화면 표시
