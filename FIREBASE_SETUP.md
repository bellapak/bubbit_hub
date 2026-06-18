# Bubbit Hub Firebase / Google 로그인 세팅 가이드

## 1) Google 로그인 켜기
Firebase Console → Authentication → Sign-in method → Google → 사용 설정 ON → 프로젝트 지원 이메일 선택 → 저장

## 2) Authorized domains 확인
Firebase Console → Authentication → Settings → Authorized domains에 실제 접속 도메인을 추가합니다.

필수 예시:
- localhost
- bubbit-hub.firebaseapp.com
- bubbit-hub.web.app
- 실제 배포 도메인

`auth/unauthorized-domain` 오류가 뜨면 대부분 이 설정 문제입니다.

## 3) 허용 계정 설정
`app.secrets.example.js`를 복사해서 `app.secrets.js`를 만들고, 실제 팀 계정만 입력하세요.

```js
export const AUTHORIZED_EMAILS = [
  "team-member@example.com"
];

export const AUTHORIZED_DOMAINS = [];
```

주의: `app.secrets.js`는 `.gitignore`에 포함되어 있으므로 외부 공유/깃 업로드 대상에서 제외됩니다.

## 4) Firestore Rules 적용
Firebase Console → Firestore Database → Rules에 `firestore.rules` 내용을 붙여넣고 Publish 합니다.

프론트엔드의 허용 계정 체크는 UX용 1차 방어입니다. 실제 데이터 보호는 Firestore Rules에서 처리해야 합니다.

## 5) 계정 관리 보안 기준
`account_issue.html`은 더 이상 비밀번호를 저장하지 않습니다.
기존 Firestore `accounts` 문서에 `pw` 필드가 남아 있다면, 계정 관리 화면의 `기존 비밀번호 필드 제거` 버튼을 눌러 삭제하세요.

## 6) 로그인 오류별 확인
- `auth/unauthorized-domain`: Firebase Authorized domains에 현재 도메인 추가
- `auth/operation-not-allowed`: Google 로그인 제공업체 켜기
- `auth/popup-blocked`: 브라우저 팝업 차단 해제 또는 리다이렉트 로그인 사용
- `allowlist-missing`: app.secrets.js의 AUTHORIZED_EMAILS/AUTHORIZED_DOMAINS 설정
