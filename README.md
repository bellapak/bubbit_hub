# Bubbit Hub Refactor — Brand Library Version

## 이번 버전의 핵심

`content.html`로 분리되어 있던 제품/콘텐츠 페이지는 운영 페이지에서 제외하고, 기존 `brandguide.html` 원본을 **브랜드 라이브러리**로 변경했습니다.
이제 사이드바의 `02` 위치는 `제품 및 콘텐츠`가 아니라 **브랜드 라이브러리**입니다.

로그인/인증 모듈은 요청에 따라 수정하지 않았습니다. 기존 `firebase.js`를 그대로 유지해 주세요.

## 파일 구조

```txt
bubbit_hub_brandlibrary/
├─ index.html              # 01 통합 대시보드
├─ brandlibrary.html       # 02 브랜드 라이브러리 / 기존 brandguide 원본 반영
├─ calender.html           # 03 일정 및 캘린더
├─ promotion.html          # 04 행사 및 프로모션
├─ cs.html                 # 05 CS 및 VOC
├─ issue.html              # 06 이슈 로그
├─ data.html               # 07 빅데이터 연동
├─ account_issue.html      # 08 계정 관리
├─ login.html              # 로그인 화면, 인증 로직 미수정
├─ content.html            # 기존 링크 호환용 redirect → brandlibrary.html
├─ brandguide.html         # 기존 링크 호환용 redirect → brandlibrary.html
├─ guide.html              # 기존 링크 호환용 redirect → brandlibrary.html
├─ campaign.html           # 기존 링크 호환용 redirect → calender.html
├─ style.css               # 공통 디자인 시스템
├─ brandlibrary.css        # 브랜드 라이브러리 전용 스타일
├─ brandguide.css          # 구버전 호환용 보관
├─ app.config.js           # 메뉴/페이지 설정 단일 관리
└─ layout.js               # 공통 사이드바/상단바 렌더링
```

## 메뉴 변경 사항

- `02 제품 및 콘텐츠` → `02 브랜드 라이브러리`
- 기존 `07 브랜드 가이드라인` 메뉴는 제거
- 기존 `08 빅데이터 연동` → `07 빅데이터 연동`
- 기존 `09 계정 관리` → `08 계정 관리`

## 관리 포인트

### 메뉴명/순서/링크 변경
`app.config.js`의 `NAV_GROUPS`만 수정하면 됩니다.

### 페이지 타이틀/검색창 변경
`app.config.js`의 `PAGE_CONFIG`만 수정하면 됩니다.

### 브랜드 라이브러리 내용 수정
`brandlibrary.html`을 수정하면 됩니다.

### 브랜드 라이브러리 스타일 수정
`brandlibrary.css`를 수정하면 됩니다.

## 호환 처리

기존에 남아 있을 수 있는 링크가 깨지지 않도록 아래 파일은 모두 `brandlibrary.html`로 이동 처리했습니다.

- `content.html`
- `brandguide.html`
- `guide.html`

## 적용 방법

1. 압축을 풀고 기존 프로젝트 폴더에 업로드합니다.
2. 기존 `firebase.js`는 그대로 같은 위치에 둡니다.
3. 메인 진입 파일은 `index.html`입니다.
4. 브랜드 라이브러리는 `brandlibrary.html`입니다.
```
