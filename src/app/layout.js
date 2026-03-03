// src/app/layout.js
import { State } from "./state.js";
import { DOM } from "./dom.js";

export const Layout = {
  applyChartAutoHeight() {
    // ✅ Version simple (pas besoin de getAutoChartHeightPx)

    const itemCount = Array.isArray(State.rows) ? State.rows.length : 0;
    const density = State.layout?.density || "standard";

    let h = 420;
    if (itemCount <= 8) h = 420;
    else if (itemCount <= 14) h = 620;
    else if (itemCount <= 20) h = 820;
    else h = 1020;

    if (density === "expanded") h = Math.round(h * 1.2);

    const wrap = DOM.canvas?.parentElement;
    if (!wrap) return;

    wrap.style.height = `${h}px`;

    if (State.chart) State.chart.resize();
  },
};