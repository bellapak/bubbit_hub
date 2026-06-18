export const NAV_GROUPS = [
  {
    label: "WORKSPACE",
    items: [
      { id: "dashboard", number: "01", title: "통합 대시보드", href: "index.html" },
      { id: "brandlibrary", number: "02", title: "브랜드 라이브러리", href: "brandlibrary.html" },
      { id: "calendar", number: "03", title: "일정 및 캘린더", href: "calender.html" },
      { id: "promotion", number: "04", title: "행사 및 프로모션", href: "promotion.html" }
    ]
  },
  {
    label: "MANAGEMENT",
    items: [
      { id: "cs", number: "05", title: "CS 및 VOC 관리", href: "cs.html" },
      { id: "issue", number: "06", title: "이슈 로그", href: "issue.html" },
      { id: "data", number: "07", title: "빅데이터 연동", href: "data.html" },
      { id: "account", number: "08", title: "계정 관리", href: "account_issue.html" }
    ]
  }
];

export const PAGE_ALIASES = {
  "": "index.html",
  "content.html": "brandlibrary.html",
  "brandguide.html": "brandlibrary.html",
  "guide.html": "brandlibrary.html",
  "campaign.html": "calender.html"
};

export const PAGE_CONFIG = {
  "index.html": {
    id: "dashboard",
    title: "통합 대시보드",
    action: { label: "+ 새 일정 등록", handler: "openTaskModal", variant: "primary" }
  },
  "brandlibrary.html": {
    id: "brandlibrary",
    title: "브랜드 라이브러리",
    search: { placeholder: "브랜드/에셋 검색", handler: "searchTable" }
  },
  "calender.html": {
    id: "calendar",
    title: "일정 및 캘린더",
    search: { placeholder: "일정 검색", handler: "searchCalendar" },
    action: { label: "새 일정 추가", handler: "openCreateModal", variant: "primary" }
  },
  "promotion.html": {
    id: "promotion",
    title: "행사 및 프로모션 기획",
    search: { placeholder: "행사명 검색", handler: "searchTable" }
  },
  "cs.html": {
    id: "cs",
    title: "CS 및 VOC 관리",
    search: { placeholder: "내용 검색", handler: "searchTable" }
  },
  "issue.html": {
    id: "issue",
    title: "이슈 로그",
    search: { placeholder: "내용 검색", handler: "searchTable" }
  },
  "data.html": {
    id: "data",
    title: "빅데이터 연동 허브",
    search: { placeholder: "내용 검색", handler: "searchTable" }
  },
  "account_issue.html": {
    id: "account",
    title: "계정 관리",
    search: { placeholder: "계정 검색", handler: "searchTable" }
  }
};
