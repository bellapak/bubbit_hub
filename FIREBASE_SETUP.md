# Bubbit Hub Google 로그인 세팅 가이드

## 1) Firebase Console에서 Google 로그인 켜기

Firebase Console → Authentication → Sign-in method → Google → 사용 설정 ON → 프로젝트 지원 이메일 선택 → 저장

## 2) Authorized domains 확인

Firebase Console → Authentication → Settings → Authorized domains에 아래 도메인을 추가합니다.

- localhost
- bubbit-hub.firebaseapp.com
- bubbit-hub.web.app
- 실제 배포 도메인

## 3) 접속 허용 계정 추가

`app.secrets.example.js`를 복사해서 같은 폴더에 `app.secrets.js`를 만듭니다.

```js
export const AUTHORIZED_EMAILS = [
  "허용할_구글계정@example.com"
];

export const AUTHORIZED_DOMAINS = [];
```

중요: 실제 개인 이메일이 들어간 `app.secrets.js`는 GitHub나 외부 공유 ZIP에 포함하지 마세요.

## 4) Firestore Rules 적용

Firebase Console → Firestore Database → Rules에 `firestore.rules` 내용을 붙여넣고, 예시 이메일을 실제 허용 계정으로 바꾼 뒤 Publish 합니다.

프론트엔드의 `app.secrets.js`는 화면 접근을 막는 1차 장치이고, 실제 데이터 보호는 Firestore Rules가 담당합니다.

## 5) 배포 시 체크할 파일

아래 파일은 같은 폴더에 있어야 합니다.

- firebase.js
- app.secrets.js
- login.html
- style.css
- index.html 등 전체 HTML 파일

단, 공개 저장소에는 `app.secrets.js`를 올리지 않는 것을 권장합니다.

## 6) 현재 구현된 기능

- Google 팝업 로그인
- 팝업 차단 시 redirect 로그인 재시도
- 허용 이메일/도메인 화이트리스트
- 비허용 계정 차단 및 로그아웃
- 모든 내부 페이지 로그인 보호
- 로그인 실패 사유 화면 표시
