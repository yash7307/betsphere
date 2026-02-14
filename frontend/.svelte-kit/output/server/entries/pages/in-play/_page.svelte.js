import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
import { O as OddsButton, B as BetSlip } from "../../../chunks/BetSlip.js";
import { M as MOCK_DATA } from "../../../chunks/formatters.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let match = MOCK_DATA.liveMatches[0];
    let showBetSlip = false;
    let selectedBet = null;
    function selectBet(selection, odds) {
      selectedBet = {
        matchId: match.matchId,
        match: `${match.teams.home.name} vs ${match.teams.away.name}`,
        league: match.league,
        selection,
        odds
      };
      showBetSlip = true;
    }
    $$renderer2.push(`<div class="in-play-page">`);
    if (match) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="match-detail-card"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;"><span style="font-size:12px;color:var(--color-text-muted);">${escape_html(match.league)}</span> <span class="badge badge-live"><span style="font-size:8px;margin-right:4px;">●</span> LIVE</span></div> <div class="match-score-section"><div class="team-info"><div class="team-flag">${escape_html(match.teams.home.flag)}</div> <div style="font-weight:700;font-size:16px;">${escape_html(match.teams.home.name)}</div> `);
      if (match.teams.home.score) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div style="font-size:24px;font-weight:800;color:var(--color-primary);margin-top:4px;">${escape_html(match.teams.home.score)}</div> <div style="font-size:12px;color:var(--color-text-muted);">${escape_html(match.teams.home.overs)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="vs-badge">VS</div> <div class="team-info"><div class="team-flag">${escape_html(match.teams.away.flag)}</div> <div style="font-weight:700;font-size:16px;">${escape_html(match.teams.away.name)}</div> `);
      if (match.teams.away.score) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div style="font-size:24px;font-weight:800;color:var(--color-primary);margin-top:4px;">${escape_html(match.teams.away.score)}</div> <div style="font-size:12px;color:var(--color-text-muted);">${escape_html(match.teams.away.overs)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div> <div style="margin-bottom:16px;"><h3 style="font-size:16px;font-weight:700;margin-bottom:12px;">Match Winner</h3> <div class="odds-row">`);
      OddsButton($$renderer2, {
        selection: match.teams.home.name,
        odds: match.odds.home.back,
        onclick: () => selectBet(match.teams.home.name, match.odds.home.back)
      });
      $$renderer2.push(`<!----> `);
      OddsButton($$renderer2, {
        selection: match.teams.away.name,
        odds: match.odds.away.back,
        onclick: () => selectBet(match.teams.away.name, match.odds.away.back)
      });
      $$renderer2.push(`<!----></div></div> `);
      if (match.sessionRuns) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div style="margin-bottom:16px;"><h3 style="font-size:16px;font-weight:700;margin-bottom:12px;">Session &amp; Stats</h3> <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div class="session-card"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Session Runs</div> <div style="font-weight:700;color:var(--color-primary);">${escape_html(match.sessionRuns)}</div></div> `);
        if (match.topBatsman) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="session-card"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Top Batsman</div> <div style="font-weight:700;">${escape_html(match.topBatsman)}</div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (match.winProbability) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="session-card"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Win Probability</div> <div style="font-weight:700;color:var(--color-primary);">${escape_html(match.teams.home.name)}: ${escape_html(match.winProbability.home)}%</div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (match.targetProjection) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="session-card"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Target Projection</div> <div style="font-weight:700;">${escape_html(match.targetProjection)}</div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (match.runRate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div style="margin-bottom:16px;"><h3 style="font-size:16px;font-weight:700;margin-bottom:12px;">Run Rate</h3> <div style="display:flex;gap:16px;"><div class="session-card" style="flex:1;"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Current RR</div> <div style="font-weight:700;font-size:20px;color:var(--color-primary);">${escape_html(match.runRate.current)}</div></div> <div class="session-card" style="flex:1;"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Required RR</div> <div style="font-weight:700;font-size:20px;color:var(--color-warning);">${escape_html(match.runRate.required)}</div></div></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    BetSlip($$renderer2, {
      isOpen: showBetSlip,
      bet: selectedBet,
      onclose: () => showBetSlip = false
    });
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
