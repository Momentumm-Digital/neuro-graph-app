import { State } from "./state.js";
import { DOM } from "./dom.js";

export const Layout = {
  getAutoChartHeightPx(itemCount, density = "standard") {
    
  let h = 320;

  if (itemCount <= 6) h = 320;
  else if (itemCount <= 8) h = 380;
  else if (itemCount <= 14) h = 620;
  else if (itemCount <= 20) h = 820;
  else h = 1020;

    if (density === "expanded") h = Math.round(h * 1.2); // +20%
    return h;
  },

  applyChartAutoHeight() {
    const itemCount = Array.isArray(State.rows) ? State.rows.length : 0;
    const density = State.layout?.density || "standard";

    const h = Layout.getAutoChartHeightPx(itemCount, density);

    const wrap = DOM.canvas?.parentElement; // ou DOM.canvasWrap si tu l’as
    if (!wrap) return;

    wrap.style.height = `${h}px`;

    if (State.chart) State.chart.resize();
  },
};