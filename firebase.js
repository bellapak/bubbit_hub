// firebase.js — Bubbit Hub 공통 Firebase 모듈
// 모든 페이지에서 이 파일을 import해서 사용합니다.

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFxVAAkgut4hsmafMMxRo2Ge2P7td6JOs",
  authDomain: "bubbit-hub.firebaseapp.com",
  projectId: "bubbit-hub",
  storageBucket: "bubbit-hub.firebasestorage.app",
  messagingSenderId: "183100911164",
  appId: "1:183100911164:web:c1a1fa4b273d9ddccf5d39"
};

// 중복 초기화 방지
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// 허용 이메일 목록 — 한 곳에서만 관리
export const ALLOWED_EMAILS = ["17mj15@gmail.com", "bubbitlab@gmail.com"];

const isAuthorized = (email) => {
  if (!email) return false;
  return ALLOWED_EMAILS.map(e => e.toLowerCase().trim())
                       .includes(email.toLowerCase().trim());
};
/**
 * 인증 가드 — 보호된 페이지 최상단에서 호출
 * 1) 로그인 안 된 경우 → login.html 이동
 * 2) 허용되지 않은 이메일 → login.html 이동
 * 3) 통과 시 → main-content를 visible로 전환 후 callback 실행
 */
export function requireAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }
    // 수정된 검증 함수 사용
    if (!isAuthorized(user.email)) {
      alert("접근 권한이 없습니다.");
      signOut(auth).finally(() => { window.location.href = "login.html"; });
      return;
    }
    const main = document.querySelector(".main-content");
    if (main) main.style.visibility = "visible";
    if (typeof callback === "function") callback(user);
  });
}
