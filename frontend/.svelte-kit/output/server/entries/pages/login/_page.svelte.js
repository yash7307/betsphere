import { Z as attr_class, a4 as attr, _ as stringify } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/api.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let loading = false;
    let loginEmail = "";
    let loginPassword = "";
    $$renderer2.push(`<div class="auth-page"><div style="text-align:center;margin-bottom:32px;"><h1 style="font-size:28px;font-weight:800;color:var(--color-primary);margin-bottom:8px;">BetSphere</h1> <p style="color:var(--color-text-muted);font-size:14px;">Your Premier Cricket Betting Platform</p></div> <div class="auth-tabs"><button${attr_class(`auth-tab ${stringify("active")}`)}>Login</button> <button${attr_class(`auth-tab ${stringify("")}`)}>Register</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<form class="auth-form"><div class="form-group"><label for="login-email">Email</label> <input id="login-email" type="email" placeholder="Enter your email"${attr("value", loginEmail)}/></div> <div class="form-group"><label for="login-password">Password</label> <div class="input-group"><input id="login-password"${attr("type", "password")} placeholder="Enter your password"${attr("value", loginPassword)}/> <button type="button" class="toggle-password">${escape_html("👁️")}</button></div></div> <button type="submit" class="btn btn-primary btn-lg" style="width:100%;"${attr("disabled", loading, true)}>${escape_html("Login")}</button></form>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="auth-divider">Or continue with</div> <div class="social-buttons"><button class="social-btn"><span>🔵</span> Google</button> <button class="social-btn"><span>📘</span> Facebook</button></div></div>`);
  });
}
export {
  _page as default
};
