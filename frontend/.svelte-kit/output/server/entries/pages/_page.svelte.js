import { a1 as attr_style, $ as ensure_array_like, Z as attr_class, _ as stringify } from "../../chunks/index2.js";
import { e as escape_html } from "../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { f as formatters, M as MOCK_DATA } from "../../chunks/formatters.js";
function MatchCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { match } = $$props;
    $$renderer2.push(`<div class="match-card"><div class="match-header"><div class="match-info">${escape_html(match.league)}</div> `);
    if (match.status === "LIVE") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="badge badge-live"><span style="font-size:8px;margin-right:4px;">●</span> LIVE</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span class="badge badge-info">${escape_html(match.time)}</span>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="match-teams"><div class="team"><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:20px;">${escape_html(match.teams.home.flag)}</span> <span class="team-name">${escape_html(match.teams.home.name)}</span></div> `);
    if (match.teams.home.score) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div style="display:flex;gap:8px;align-items:center;"><span class="team-score">${escape_html(match.teams.home.score)}</span> <span style="font-size:12px;color:var(--color-text-muted);">${escape_html(match.teams.home.overs)}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="team"><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:20px;">${escape_html(match.teams.away.flag)}</span> <span class="team-name">${escape_html(match.teams.away.name)}</span></div> `);
    if (match.teams.away.score) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div style="display:flex;gap:8px;align-items:center;"><span class="team-score">${escape_html(match.teams.away.score)}</span> <span style="font-size:12px;color:var(--color-text-muted);">${escape_html(match.teams.away.overs)}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>  <div class="match-odds"><div class="odds-btn"><div class="odds-value">${escape_html(formatters.odds(match.odds.home.back))}</div> <div class="odds-label">${escape_html(match.teams.home.name)}</div></div> <div class="odds-btn"><div class="odds-value">${escape_html(formatters.odds(match.odds.away.back))}</div> <div class="odds-label">${escape_html(match.teams.away.name)}</div></div></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeCategory = "all";
    const categories = [
      { id: "all", label: "🏏 All", icon: "" },
      { id: "live", label: "🔴 Live", icon: "" },
      { id: "upcoming", label: "📅 Upcoming", icon: "" },
      { id: "ipl", label: "🏆 IPL", icon: "" }
    ];
    let filteredLiveMatches = MOCK_DATA.liveMatches;
    let filteredUpcomingMatches = MOCK_DATA.upcomingMatches;
    $$renderer2.push(`<div class="home-page"><div style="padding:16px;"><div class="promo-banner"${attr_style(`background:${stringify(MOCK_DATA.promoData.image)};`)}><div class="promo-badge">⚡ Featured</div> <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">${escape_html(MOCK_DATA.promoData.title)}</h2> <p style="font-size:14px;color:var(--color-text-secondary);margin-bottom:16px;">${escape_html(MOCK_DATA.promoData.description)}</p> <button class="btn btn-primary">${escape_html(MOCK_DATA.promoData.ctaText)}</button></div> <div class="category-filters" style="margin-bottom:24px;"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cat = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`category-btn ${stringify(activeCategory === cat.id ? "active" : "")}`)}>${escape_html(cat.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredLiveMatches.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div style="margin-bottom:24px;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;"><h2 style="font-size:18px;font-weight:700;">🔴 Live Matches</h2> <span style="font-size:12px;color:var(--color-text-muted);">${escape_html(filteredLiveMatches.length)} matches</span></div> <!--[-->`);
      const each_array_1 = ensure_array_like(filteredLiveMatches);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let match = each_array_1[$$index_1];
        MatchCard($$renderer2, { match });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (filteredUpcomingMatches.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div style="margin-bottom:24px;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;"><h2 style="font-size:18px;font-weight:700;">📅 Upcoming</h2></div> <!--[-->`);
      const each_array_2 = ensure_array_like(filteredUpcomingMatches);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let match = each_array_2[$$index_2];
        MatchCard($$renderer2, { match });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div style="margin-bottom:24px;"><h2 style="font-size:18px;font-weight:700;margin-bottom:16px;">🔥 Trending Bets</h2> <!--[-->`);
      const each_array_3 = ensure_array_like(MOCK_DATA.trendingBets);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let bet = each_array_3[$$index_3];
        $$renderer2.push(`<div class="trending-bet"><div class="trending-icon">${escape_html(bet.icon)}</div> <div style="flex:1;"><div style="font-weight:600;font-size:14px;">${escape_html(bet.player)}</div> <div style="font-size:12px;color:var(--color-text-muted);">${escape_html(bet.team)} • ${escape_html(bet.market)}</div></div> <div style="text-align:right;"><div style="font-weight:700;color:var(--color-primary);font-size:16px;">${escape_html(formatters.odds(bet.odds))}</div> <div style="font-size:10px;color:var(--color-text-muted);">odds</div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
