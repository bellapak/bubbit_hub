// app.secrets.js로 복사한 뒤 실제 값만 입력하세요.
// 이 파일에는 실제 개인 이메일을 넣지 말고 예시만 보관합니다.

// Firebase 프로젝트를 바꾸는 경우에만 firebaseConfig를 작성하세요.
// 현재 프로젝트를 그대로 쓸 때는 아래 firebaseConfig export를 삭제해도 됩니다.
export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 개인 계정은 app.secrets.js에서만 관리하세요.
export const AUTHORIZED_EMAILS = [
  "team-member@example.com"
];

// 같은 회사 도메인을 통째로 허용할 때만 사용하세요.
// 예: export const AUTHORIZED_DOMAINS = ["company.co.kr"];
export const AUTHORIZED_DOMAINS = [];
