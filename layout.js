import { NAV_GROUPS, PAGE_CONFIG, PAGE_ALIASES } from "./app.config.js";

function getCurrentFileName() {
  const raw = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
  return PAGE_ALIASES[raw] || raw;
}

function getPageConfig() {
  const main = document.querySelector(".main-content");
  const fileName = getCurrentFileName();
  const pageFromMain = main?.dataset?.page;
  const matchedByPage = Object.entries(PAGE_CONFIG).find(([, config]) => config.id === pageFromMain);
  return matchedByPage ? matchedByPage[1] : (PAGE_CONFIG[fileName] || PAGE_CONFIG["index.html"]);
}

function createNavItem(item, activeId) {
  const a = document.createElement("a");
  a.href = item.href;
  a.className = `nav-item${item.id === activeId ? " active" : ""}`;
  a.textContent = `${item.number} ${item.title}`;
  return a;
}

function renderSidebar(activeId) {
  const app = document.getElementById("app");
  if (!app || app.querySelector(".sidebar")) return;

  const nav = document.createElement("nav");
  nav.className = "sidebar";

  const logo = document.createElement("a");
  logo.className = "brand-logo";
  logo.href = "index.html";
  logo.textContent = "Bubbit Hub";
  nav.appendChild(logo);

  NAV_GROUPS.forEach(group => {
    const label = document.createElement("div");
    label.className = "nav-label";
    label.textContent = group.label;
    nav.appendChild(label);

    group.items.forEach(item => nav.appendChild(createNavItem(item, activeId)));
  });

  app.prepend(nav);
}

function makeButton(action) {
  const button = document.createElement("button");
  button.className = `btn${action.variant === "primary" ? " btn-primary" : ""}`;
  button.type = "button";
  button.textContent = action.label;
  button.addEventListener("click", () => {
    const fn = window[action.handler];
    if (typeof fn === "function") {
      fn();
      return;
    }
    console.warn(`[Bubbit Hub] ${action.handler} 함수가 아직 준비되지 않았습니다.`);
  });
  return button;
}

function makeSearch(search) {
  const input = document.createElement("input");
  input.type = "text";
  input.id = "search-input";
  input.className = "input-field topbar-search";
  input.placeholder = search.placeholder || "검색";
  input.addEventListener("keyup", () => {
    const fn = window[search.handler || "searchTable"];
    if (typeof fn === "function") fn();
  });
  return input;
}

function renderTopbar(config) {
  const main = document.querySelector(".main-content");
  if (!main || main.querySelector(":scope > .topbar")) return;

  const header = document.createElement("header");
  header.className = "topbar";

  const title = document.createElement("div");
  title.className = "topbar-title";

  const home = document.createElement("a");
  home.href = "index.html";
  home.className = "btn";
  home.style.padding = "10px 14px";
  home.style.fontSize = "14px";
  home.textContent = "홈";

  const span = document.createElement("span");
  span.textContent = config.title || "Bubbit Hub";

  title.append(home, span);
  header.appendChild(title);

  if (config.search || config.action) {
    const actions = document.createElement("div");
    actions.className = "topbar-actions";
    if (config.search) actions.appendChild(makeSearch(config.search));
    if (config.action) actions.appendChild(makeButton(config.action));
    header.appendChild(actions);
  }

  main.prepend(header);
}

function ensureToast() {
  if (document.getElementById("toast")) return;
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = "메시지";
  document.body.appendChild(toast);
}

function initLayout() {
  const config = getPageConfig();
  renderSidebar(config.id);
  renderTopbar(config);
  ensureToast();
  document.body.classList.add("layout-ready");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLayout);
} else {
  initLayout();
}
