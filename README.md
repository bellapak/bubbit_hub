# Bubbit Hub Refactored Structure

## 핵심 변경

기존 각 HTML 파일에 반복되던 사이드바와 상단바를 `app.config.js`와 `layout.js`로 분리했습니다.  
이제 메뉴명, 링크, 활성 메뉴, 상단 타이틀, 검색창, 액션 버튼은 한 곳에서 관리합니다.

이번 버전에서는 사용자가 업로드한 `brandguide.html`을 실제 브랜드 가이드/에셋 허브 원본 페이지로 보고 구조를 정리했습니다. 기존 `content.html`에서 운영하던 브랜드 가이드 성격의 화면이 `brandguide.html`로 네이밍 변경된 것으로 처리했습니다.

## 파일 구조

```txt
bubbit_hub_refactored/
├─ index.html              # 시작점 / 통합 대시보드
├─ content.html            # 제품 및 콘텐츠 독립 페이지 기본 구조
├─ brandguide.html         # 브랜드 가이드라인 / 에셋 허브 원본 반영
├─ calender.html           # 일정 및 캘린더
├─ promotion.html          # 행사 및 프로모션
├─ cs.html                 # CS 및 VOC
├─ issue.html              # 이슈 로그
├─ data.html               # 빅데이터 연동
├─ account_issue.html      # 계정 관리
├─ login.html              # 로그인 화면, 이번 작업에서는 구조만 유지
├─ guide.html              # 기존 링크 호환용 redirect → brandguide.html
├─ campaign.html           # 기존 링크 호환용 redirect → calender.html
├─ style.css               # 공통 디자인 시스템
├─ brandguide.css          # 브랜드 가이드라인 전용 스타일
├─ app.config.js           # 메뉴/페이지 메타데이터 관리
└─ layout.js               # 공통 사이드바/상단바 렌더링
```

## 앞으로 수정할 위치

- 메뉴명/순서/링크 변경: `app.config.js`
- 사이드바/상단바 구조 변경: `layout.js`
- 공통 UI 스타일 변경: `style.css`
- 브랜드 가이드라인 전용 스타일 변경: `brandguide.css`
- 각 페이지 기능 수정: 해당 HTML 파일 하단의 기존 script 영역

## 적용 방법

1. 기존 프로젝트 파일을 백업합니다.
2. 이 폴더의 파일을 프로젝트 루트에 복사합니다.
3. 기존 `firebase.js`는 그대로 유지합니다. 이번 구조 개편에서는 로그인/인증 모듈을 수정하지 않았습니다.
4. 브라우저에서 `index.html`을 열어 메뉴 이동과 각 페이지의 기본 표시를 확인합니다.

## 참고

- `brandguide.html`은 브랜드 가이드/에셋 허브의 실제 원본 페이지로 반영했습니다.
- `content.html`은 제품 상세페이지, 콘텐츠 소재, 캠페인 산출물 등을 별도로 관리할 때 확장할 수 있는 독립 페이지로 남겨두었습니다.
- 기존 `guide.html` 링크는 `brandguide.html`로 이동되도록 redirect 파일을 추가했습니다.
- 기존 캘린더 파일 안의 `campaign.html` 링크 오류를 고려해 `campaign.html`도 `calender.html`로 이동되도록 추가했습니다.
