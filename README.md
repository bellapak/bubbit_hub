# Bubbit Hub Secure v3.1

## 이번 수정의 기준

이번 버전은 업로드된 아카이브 코드 안에서만 구조를 정리한 버전입니다. `content.html`은 운영 페이지에서 제외하고, 기존 브랜드 가이드 원본은 `brandlibrary.html`로 사용합니다.

## 가장 중요한 로그인 구조

원래 `firebase.js`에 직접 들어 있던 허용 이메일을 완전히 삭제하면 로그인은 당연히 막힙니다. 이번 수정의 의도는 **이메일 허용 목록을 없애는 것**이 아니라, 공개 코드 파일에서 분리하는 것입니다.

실제 접속 허용 계정은 아래 파일에 넣어야 합니다.

```txt
app.secrets.js
```

이 파일은 `.gitignore`에 포함되어 있으므로 GitHub 같은 공개 저장소에는 올리지 않는 것을 권장합니다.

## app.secrets.js 생성 방법

`app.secrets.example.js`를 복사해서 `app.secrets.js`로 이름을 바꾼 뒤, 실제 허용 이메일을 입력하세요.

```js
export const AUTHORIZED_EMAILS = [
  "허용할_구글계정@example.com"
];

export const AUTHORIZED_DOMAINS = [];
```

회사 도메인을 통째로 허용할 때만 아래처럼 사용합니다.

```js
export const AUTHORIZED_EMAILS = [];
export const AUTHORIZED_DOMAINS = ["company.co.kr"];
```

## 보안 기준

프론트엔드 JS에 들어가는 이메일 목록은 브라우저에서 완전히 숨길 수 없습니다. 따라서 `app.secrets.js`는 공개 저장소에 계정 정보가 남지 않게 하는 용도이고, 실제 데이터 보호는 반드시 `firestore.rules`에서 처리해야 합니다.

즉, 최종 구조는 아래처럼 운영해야 합니다.

1. `app.secrets.js`에는 화면 접근용 허용 계정 입력
2. Firebase Console의 Firestore Rules에는 같은 허용 계정 또는 도메인 조건 적용
3. GitHub/공유 ZIP에는 실제 개인 이메일이 들어간 `app.secrets.js`를 포함하지 않음

## 파일 구조

```txt
bubbit_hub_secure_v3/
├─ index.html              # 01 통합 대시보드
├─ brandlibrary.html       # 02 브랜드 라이브러리
├─ calender.html           # 03 일정 및 캘린더
├─ promotion.html          # 04 행사 및 프로모션
├─ cs.html                 # 05 CS 및 VOC
├─ issue.html              # 06 이슈 로그
├─ data.html               # 07 빅데이터 연동
├─ account_issue.html      # 08 계정 관리
├─ login.html              # Google 로그인
├─ firebase.js             # Firebase 공통 모듈
├─ app.secrets.example.js  # 허용 계정 입력 예시
├─ firestore.rules         # Firestore 보안 규칙 예시
├─ style.css               # 공통 스타일
├─ brandlibrary.css        # 브랜드 라이브러리 전용 스타일
├─ app.config.js           # 메뉴/페이지 설정
└─ layout.js               # 공통 레이아웃
```

## 이번 버전에서 수정된 문제

- `login.html`이 구버전 `ALLOWED_EMAILS`를 import해서 생기던 로그인 오류 수정
- `firebase.js`에는 구버전 호환 alias를 남겨 기존 코드가 깨지지 않도록 처리
- 실제 허용 이메일은 `app.secrets.js`에서만 관리하도록 정리
- README와 Firebase 세팅 문서에서 개인 이메일 예시 제거
- 브랜드 라이브러리 계층 구조와 로딩 구조 개선 유지

## 적용 순서

1. ZIP 압축 해제
2. `app.secrets.example.js`를 복사해 `app.secrets.js` 생성
3. `app.secrets.js`에 실제 허용 Google 이메일 입력
4. Firebase Console에서 Google 로그인 제공업체 ON
5. Firebase Console → Authentication → Settings → Authorized domains에 배포 도메인 추가
6. Firestore Rules에 `firestore.rules` 내용을 실제 허용 계정 기준으로 수정해 배포
7. `index.html`로 접속
