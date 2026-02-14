import { Z as attr_class, a1 as attr_style, _ as stringify, a3 as attributes, a4 as attr, a0 as store_get, $ as ensure_array_like, a2 as unsubscribe_stores } from "./index2.js";
import { f as formatters } from "./formatters.js";
import { e as escape_html } from "./context.js";
import "clsx";
import { u as user } from "./auth.js";
import "./api.js";
import { e as error } from "./toast.js";
function OddsButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { selection = "", odds = 0, isActive = false, onclick } = $$props;
    $$renderer2.push(`<button${attr_class(`odds-btn ${stringify(isActive ? "active" : "")}`)}${attr_style(isActive ? "background:rgba(0,255,135,0.15);border-color:var(--color-primary);" : "")}><div class="odds-value">${escape_html(formatters.odds(odds))}</div> <div class="odds-label">${escape_html(selection)}</div></button>`);
  });
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = false, title = "", children } = $$props;
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="modal show"><div class="modal-content"><div class="modal-header"><h3>${escape_html(title)}</h3> <button class="close-modal">×</button></div> <div class="modal-body">`);
      children($$renderer2);
      $$renderer2.push(`<!----></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Button($$renderer, $$props) {
  let {
    variant = "primary",
    size = "md",
    disabled = false,
    className = "",
    onclick,
    children,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  $$renderer.push(`<button${attributes({
    class: `btn btn-${stringify(variant)} btn-${stringify(size)} ${stringify(className)}`,
    disabled,
    ...rest
  })}>`);
  children($$renderer);
  $$renderer.push(`<!----></button>`);
}
function BetSlip($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { isOpen = false, bet = null, onclose } = $$props;
    let stake = "";
    let loading = false;
    const quickAmounts = [100, 250, 500, 1e3];
    async function handlePlaceBet() {
      {
        error("Please enter a valid stake amount");
        return;
      }
    }
    if (bet) {
      $$renderer2.push("<!--[-->");
      Modal($$renderer2, {
        isOpen,
        title: "Place Bet",
        children: ($$renderer3) => {
          $$renderer3.push(`<div style="padding:16px;"><div style="background:var(--color-background);padding:16px;border-radius:8px;margin-bottom:16px;"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">${escape_html(bet.match)}</div> <div style="font-size:16px;font-weight:600;color:var(--color-primary);margin-bottom:8px;">${escape_html(bet.selection)}</div> <div style="display:flex;justify-content:space-between;"><span style="font-size:12px;color:var(--color-text-secondary);">Odds</span> <span style="font-size:14px;font-weight:600;">${escape_html(formatters.odds(bet.odds))}</span></div></div> <div class="amount-input-group"><label for="stake-input">Stake Amount (₹)</label> <input id="stake-input" type="number" class="amount-input" placeholder="Enter amount"${attr("value", stake)} min="1"${attr("max", store_get($$store_subs ??= {}, "$user", user).balance)}/> <div class="quick-amounts"><!--[-->`);
          const each_array = ensure_array_like(quickAmounts);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let amount = each_array[$$index];
            $$renderer3.push(`<button class="quick-amount-btn">₹${escape_html(amount)}</button>`);
          }
          $$renderer3.push(`<!--]--></div></div> `);
          {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> <div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:12px;color:var(--color-text-muted);"><span>Available Balance</span> <span style="font-weight:600;">${escape_html(formatters.currency(store_get($$store_subs ??= {}, "$user", user).balance))}</span></div> `);
          {
            let children = function($$renderer4) {
              $$renderer4.push(`<!---->${escape_html("Place Bet")}`);
            };
            Button($$renderer3, {
              variant: "primary",
              size: "lg",
              onclick: handlePlaceBet,
              disabled: loading,
              style: "width:100%;",
              children,
              $$slots: { default: true }
            });
          }
          $$renderer3.push(`<!----></div>`);
        }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  BetSlip as B,
  OddsButton as O
};
