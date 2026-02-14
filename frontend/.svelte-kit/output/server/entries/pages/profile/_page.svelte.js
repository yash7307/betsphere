import { a4 as attr, a0 as store_get, Z as attr_class, _ as stringify, $ as ensure_array_like, a1 as attr_style, a2 as unsubscribe_stores } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { u as user } from "../../../chunks/auth.js";
import { f as formatters, M as MOCK_DATA } from "../../../chunks/formatters.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="profile-page"><div class="profile-header"><div class="profile-avatar"><img${attr("src", store_get($$store_subs ??= {}, "$user", user)?.avatar || `https://ui-avatars.com/api/?name=${store_get($$store_subs ??= {}, "$user", user)?.name || "User"}&background=00ff87&color=000`)} alt="Avatar"/></div> <h2 style="font-size:20px;font-weight:700;">${escape_html(store_get($$store_subs ??= {}, "$user", user)?.name || "User")}</h2> <p style="font-size:14px;color:var(--color-text-muted);">${escape_html(store_get($$store_subs ??= {}, "$user", user)?.username || "")}</p></div> <div class="balance-card"><div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:4px;">Total Balance</div> <div style="font-size:32px;font-weight:800;color:var(--color-primary);">${escape_html(formatters.currency(store_get($$store_subs ??= {}, "$user", user)?.balance || 0))}</div> <div style="display:flex;gap:8px;margin-top:16px;justify-content:center;"><button class="btn btn-primary btn-sm">Deposit</button> <button class="btn btn-secondary btn-sm">Withdraw</button></div></div> <div class="stats-grid"><div class="stat-item"><div class="stat-value">${escape_html(store_get($$store_subs ??= {}, "$user", user)?.openBets || 0)}</div> <div class="stat-label">Open Bets</div></div> <div class="stat-item"><div class="stat-value">12</div> <div class="stat-label">Won</div></div> <div class="stat-item"><div class="stat-value">67%</div> <div class="stat-label">Win Rate</div></div></div> <div style="margin-bottom:24px;"><h3 style="font-size:16px;font-weight:700;margin-bottom:16px;">Account Details</h3> <div class="card"><div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--color-border);"><span style="color:var(--color-text-muted);font-size:14px;">Email</span> <span style="font-weight:500;font-size:14px;">${escape_html(store_get($$store_subs ??= {}, "$user", user)?.email || "N/A")}</span></div> <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--color-border);"><span style="color:var(--color-text-muted);font-size:14px;">Phone</span> <span style="font-weight:500;font-size:14px;">${escape_html(store_get($$store_subs ??= {}, "$user", user)?.phone || "N/A")}</span></div> <div style="display:flex;justify-content:space-between;padding:12px 0;"><span style="color:var(--color-text-muted);font-size:14px;">KYC Status</span> <span${attr_class(`badge ${stringify(store_get($$store_subs ??= {}, "$user", user)?.kycVerified ? "badge-success" : "badge-pending")}`)}>${escape_html(store_get($$store_subs ??= {}, "$user", user)?.kycVerified ? "Verified" : "Pending")}</span></div></div></div> <div style="margin-bottom:24px;"><h3 style="font-size:16px;font-weight:700;margin-bottom:16px;">Recent Transactions</h3> <!--[-->`);
    const each_array = ensure_array_like(MOCK_DATA.transactions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let txn = each_array[$$index];
      $$renderer2.push(`<div class="card" style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-weight:600;font-size:14px;">${escape_html(txn.type)}</div> <div style="font-size:12px;color:var(--color-text-muted);">${escape_html(txn.method)} • ${escape_html(formatters.date(txn.date))}</div></div> <div style="text-align:right;"><div${attr_style(`font-weight:700;color:${stringify(txn.type === "DEPOSIT" ? "var(--color-success)" : "var(--color-danger)")};`)}>${escape_html(txn.type === "DEPOSIT" ? "+" : "-")}${escape_html(formatters.currency(txn.amount))}</div> <div style="font-size:10px;color:var(--color-text-muted);">${escape_html(txn.status)}</div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="btn btn-danger btn-lg" style="width:100%;">Logout</button></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
