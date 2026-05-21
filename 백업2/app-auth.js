import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFxVAAkgut4hsmafMMxRo2Ge2P7td6JOs",
  authDomain: "bubbit-hub.firebaseapp.com",
  projectId: "bubbit-hub",
  storageBucket: "bubbit-hub.firebasestorage.app",
  messagingSenderId: "183100911164",
  appId: "1:183100911164:web:c1a1fa4b273d9ddccf5d39"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 접속 허용 Google 계정 목록입니다. 팀원을 추가하려면 여기에 이메일을 추가하세요.
export const allowedEmails = [
  "17mj15@gmail.com",
  "bubbitlab@gmail.com"
];

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export function isAllowedEmail(email) {
  return !!email && allowedEmails.includes(email);
}

export function authErrorMessage(error) {
  switch (error?.code) {
    case "auth/popup-closed-by-user":
      return "Google 로그인 창이 닫혔습니다. 다시 시도해주세요.";
    case "auth/popup-blocked":
      return "브라우저에서 팝업이 차단되었습니다. 팝업 허용 후 다시 시도해주세요.";
    case "auth/cancelled-popup-request":
      return "이전 로그인 요청이 취소되었습니다. 다시 시도해주세요.";
    case "auth/network-request-failed":
      return "네트워크 연결이 불안정합니다. 잠시 후 다시 시도해주세요.";
    case "auth/operation-not-allowed":
      return "Firebase Authentication에서 Google 로그인이 비활성화되어 있습니다.";
    default:
      return "로그인에 실패했습니다. Google 계정을 확인한 뒤 다시 시도해주세요.";
  }
}

export async function signInWithGoogleAccount() {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  if (!isAllowedEmail(user.email)) {
    await signOut(auth);
    const error = new Error("허용되지 않은 Google 계정입니다.");
    error.code = "bubbit/not-allowed-email";
    throw error;
  }

  return user;
}

export function requireAuth() {
  onAuthStateChanged(auth, async (user) => {
    const isLoginPage = location.pathname.endsWith("login.html") || location.pathname === "/";

    if (!user) {
      if (!isLoginPage) location.href = "login.html?reason=login-required";
      return;
    }

    if (!isAllowedEmail(user.email)) {
      await signOut(auth);
      location.href = "login.html?reason=not-allowed";
      return;
    }
  });
}

export function redirectIfAlreadySignedIn() {
  onAuthStateChanged(auth, (user) => {
    if (user && isAllowedEmail(user.email)) location.href = "index.html";
  });
}

export async function logout() {
  await signOut(auth);
  location.href = "login.html?reason=logout";
}

export function renderAuthBar() {
  onAuthStateChanged(auth, (user) => {
    if (!user || !isAllowedEmail(user.email)) return;
    const topbar = document.querySelector(".topbar");
    if (!topbar || document.getElementById("auth-user-box")) return;

    const box = document.createElement("div");
    box.id = "auth-user-box";
    box.className = "auth-user-box";
    box.innerHTML = `
      <div class="auth-user-email">${user.email}</div>
      <button class="btn" id="logout-btn" type="button">로그아웃</button>
    `;

    const rightGroup = topbar.lastElementChild;
    if (rightGroup && rightGroup !== topbar.firstElementChild) {
      rightGroup.appendChild(box);
    } else {
      topbar.appendChild(box);
    }

    document.getElementById("logout-btn")?.addEventListener("click", logout);
  });
}
