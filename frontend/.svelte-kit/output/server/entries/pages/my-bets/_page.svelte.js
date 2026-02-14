import { a0 as store_get, Z as attr_class, $ as ensure_array_like, _ as stringify, a2 as unsubscribe_stores } from "../../../chunks/index2.js";
import { w as writable } from "../../../chunks/index.js";
import "../../../chunks/api.js";
import { M as MOCK_DATA, f as formatters } from "../../../chunks/formatters.js";
import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
const bets = writable(MOCK_DATA.myBets);
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let activeBets = store_get($$store_subs ??= {}, "$bets", bets).filter((b) => b.status === "OPEN" || b.status === "PENDING");
    let settledBets = store_get($$store_subs ??= {}, "$bets", bets).filter((b) => b.status === "WON" || b.status === "LOST" || b.status === "CASHED_OUT");
    $$renderer2.push(`<div class="my-bets-page"><div class="bets-tabs"><button${attr_class(`bet-tab ${stringify("active")}`)}>Active (${escape_html(activeBets.length)})</button> <button${attr_class(`bet-tab ${stringify("")}`)}>Settled (${escape_html(settledBets.length)})</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      if (activeBets.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div style="text-align:center;padding:48px;color:var(--color-text-muted);"><p style="font-size:48px;margin-bottom:16px;">📋</p> <p>No active bets</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<!--[-->`);
        const each_array = ensure_array_like(activeBets);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let bet = each_array[$$index];
          $$renderer2.push(`<div class="bet-card"><div class="bet-header"><span class="bet-match">${escape_html(bet.match)}</span> <span${attr_class(`badge ${stringify(formatters.betStatus(bet.status).class)}`)}>${escape_html(formatters.betStatus(bet.status).label)}</span></div> <div class="bet-selection">${escape_html(bet.selection)}</div> <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:8px;">${escape_html(bet.market)}</div> <div class="bet-details"><div class="bet-detail-item"><span class="bet-detail-label">Stake</span> <span class="bet-detail-value">${escape_html(formatters.currency(bet.stake))}</span></div> <div class="bet-detail-item"><span class="bet-detail-label">Odds</span> <span class="bet-detail-value">${escape_html(formatters.odds(bet.odds))}</span></div> <div class="bet-detail-item"><span class="bet-detail-label">Potential Return</span> <span class="bet-detail-value text-success">${escape_html(formatters.currency(bet.potentialReturn))}</span></div> <div class="bet-detail-item"><span class="bet-detail-label">Placed</span> <span class="bet-detail-value" style="font-size:12px;">${escape_html(bet.time)}</span></div></div> `);
          if (bet.canCashOut) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="btn btn-primary" style="width:100%;margin-top:16px;">Cash Out ${escape_html(formatters.currency(bet.cashOutValue))}</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
