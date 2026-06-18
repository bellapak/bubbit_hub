// firebase.js — Bubbit Hub 공통 Firebase 모듈
// 보안 원칙
// 1) Firebase config 값은 프론트엔드에 노출되는 공개 식별자입니다. 실제 보안은 Firebase Rules에서 제어해야 합니다.
// 2) 개인 이메일/허용 계정 목록은 이 파일에 직접 쓰지 않습니다. app.secrets.js에서만 관리합니다.
// 3) 페이지 접근 제어는 UX용 1차 방어이며, Firestore Rules를 반드시 함께 적용해야 합니다.

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const defaultFirebaseConfig = {
  apiKey: "AIzaSyDFxVAAkgut4hsmafMMxRo2Ge2P7td6JOs",
  authDomain: "bubbit-hub.firebaseapp.com",
  projectId: "bubbit-hub",
  storageBucket: "bubbit-hub.firebasestorage.app",
  messagingSenderId: "183100911164",
  appId: "1:183100911164:web:c1a1fa4b273d9ddccf5d39"
};

let localConfig = {};
try {
  localConfig = await import("./app.secrets.js");
} catch (error) {
  console.warn("[Bubbit Hub] app.secrets.js가 없어 기본 Firebase config만 사용합니다. 허용 계정은 반드시 별도 파일에서 설정하세요.");
}

const firebaseConfig = localConfig.firebaseConfig || defaultFirebaseConfig;

// 개인 이메일은 app.secrets.js에만 입력하세요.
export const AUTHORIZED_EMAILS = Array.isArray(localConfig.AUTHORIZED_EMAILS)
  ? localConfig.AUTHORIZED_EMAILS.map(email => String(email).toLowerCase().trim()).filter(Boolean)
  : [];

export const AUTHORIZED_DOMAINS = Array.isArray(localConfig.AUTHORIZED_DOMAINS)
  ? localConfig.AUTHORIZED_DOMAINS.map(domain => String(domain).toLowerCase().replace(/^@/, "").trim()).filter(Boolean)
  : [];

export const AUTH_CONFIG_READY = AUTHORIZED_EMAILS.length > 0 || AUTHORIZED_DOMAINS.length > 0;

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch(error => {
  console.warn("[Bubbit Hub] 로그인 지속 설정 실패", error);
});

export function normalizeEmail(email) {
  return String(email || "").toLowerCase().trim();
}

export function isAuthorizedEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized || !AUTH_CONFIG_READY) return false;
  const domain = normalized.split("@")[1] || "";
  return AUTHORIZED_EMAILS.includes(normalized) || AUTHORIZED_DOMAINS.includes(domain);
}

export function isAuthorizedUser(user) {
  return Boolean(user?.email && isAuthorizedEmail(user.email));
}

export function getLoginErrorMessage(error) {
  const code = error?.code || "";
  const currentHost = window.location.hostname;

  if (code === "auth/unauthorized-domain") {
    return `현재 도메인(${currentHost})이 Firebase Authorized domains에 등록되어 있지 않습니다.`;
  }
  if (code === "auth/operation-not-allowed") {
    return "Firebase Authentication에서 Google 로그인 제공업체가 꺼져 있습니다.";
  }
  if (code === "auth/popup-blocked") {
    return "브라우저가 로그인 팝업을 차단했습니다. 팝업 허용 후 다시 시도해 주세요.";
  }
  if (code === "auth/popup-closed-by-user") {
    return "로그인 창이 닫혔습니다. 다시 시도해 주세요.";
  }
  if (code === "auth/network-request-failed") {
    return "네트워크 연결이 불안정합니다. 연결을 확인한 뒤 다시 시도해 주세요.";
  }
  return "로그인에 실패했습니다. Firebase 설정과 허용 도메인을 확인해 주세요.";
}

export function redirectToLogin(reason = "") {
  const loginUrl = new URL("login.html", window.location.href);
  if (reason) loginUrl.searchParams.set("reason", reason);
  window.location.href = loginUrl.toString();
}

/**
 * 인증 가드
 * - 로그인 안 됨: login.html로 이동
 * - 허용 계정 아님: 로그아웃 후 login.html로 이동
 * - 통과: main-content 표시 후 callback 실행
 */
export function requireAuth(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      redirectToLogin("login-required");
      return;
    }

    if (!isAuthorizedUser(user)) {
      await signOut(auth).catch(() => {});
      redirectToLogin(AUTH_CONFIG_READY ? "unauthorized" : "allowlist-missing");
      return;
    }

    document.body.classList.add("auth-ready");
    const main = document.querySelector(".main-content");
    if (main) main.style.visibility = "visible";
    if (typeof callback === "function") callback(user);
  });
}

export async function logout() {
  await signOut(auth);
  redirectToLogin("signed-out");
}
