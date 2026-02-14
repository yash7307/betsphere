import { Z as attr_class, _ as stringify, $ as ensure_array_like, a0 as store_get, a1 as attr_style, a2 as unsubscribe_stores } from "../../chunks/index2.js";
import { p as page } from "../../chunks/index3.js";
import { e as escape_html } from "../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { t as toasts } from "../../chunks/toast.js";
import { a as authLoading } from "../../chunks/auth.js";
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let pathname = page.url.pathname;
    function getTitleForPath() {
      const titles = {
        "/": "BetSphere",
        "/in-play": "Live Betting",
        "/my-bets": "My Bets",
        "/profile": "Profile"
      };
      return titles[pathname] || "BetSphere";
    }
    let showBackButton = pathname.includes("/in-play/");
    $$renderer2.push(`<header class="top-header"><button${attr_class(`back-btn ${stringify(showBackButton ? "" : "hidden")}`)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <h1 id="page-title">${escape_html(getTitleForPath())}</h1> <button class="menu-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button></header>`);
  });
}
function BottomNav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let pathname = page.url.pathname;
    $$renderer2.push(`<nav class="bottom-nav"><button${attr_class(`nav-item ${stringify(pathname === "/" ? "active" : "")}`)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span>Home</span></button> <button${attr_class(`nav-item ${stringify(pathname.startsWith("/in-play") ? "active" : "")}`)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"></path></svg> <span>In-Play</span></button> <button class="nav-item center-fab"><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg></button> <button${attr_class(`nav-item ${stringify(pathname === "/my-bets" ? "active" : "")}`)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 2C7.89543 2 7 2.89543 7 4V20C7 21.1046 7.89543 22 9 22H18C19.1046 22 20 21.1046 20 20V7L15 2H9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 2V7H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span>My Bets</span></button> <button${attr_class(`nav-item ${stringify(pathname === "/profile" ? "active" : "")}`)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span>Profile</span></button></nav>`);
  });
}
function Toast($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const typeStyles = {
      success: { background: "var(--color-success)", color: "#000" },
      error: { background: "var(--color-danger)", color: "#fff" },
      warning: { background: "var(--color-warning)", color: "#000" },
      info: { background: "var(--color-info)", color: "#fff" }
    };
    $$renderer2.push(`<div class="toast-container" style="position:fixed;top:80px;right:16px;z-index:1000;display:flex;flex-direction:column;gap:8px;max-width:400px;"><!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$toasts", toasts));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let toast = each_array[$$index];
      const style = typeStyles[toast.type] || typeStyles.info;
      $$renderer2.push(`<div${attr_style(`background:${stringify(style.background)};color:${stringify(style.color)};padding:12px 16px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:space-between;gap:12px;animation:slideIn 0.3s ease;min-width:250px;`)}><span style="font-weight:600;font-size:14px;">${escape_html(toast.message)}</span> <button style="background:none;border:none;color:inherit;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;">×</button></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Loading($$renderer) {
  $$renderer.push(`<div class="loading-overlay"><div class="spinner"></div></div>`);
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    if (store_get($$store_subs ??= {}, "$authLoading", authLoading)) {
      $$renderer2.push("<!--[-->");
      Loading($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
      Header($$renderer2);
      $$renderer2.push(`<!----> <main id="main-content" class="main-content">`);
      children($$renderer2);
      $$renderer2.push(`<!----></main> `);
      BottomNav($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]--> `);
    Toast($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
