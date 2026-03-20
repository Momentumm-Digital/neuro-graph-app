import { State } from "./state.js";
import { DOM } from "./dom.js";

export const Layout = {
  applyChartLayoutMode() {
    const mode = State.layout?.mode || "standard";
    const wrap = DOM.canvas?.closest(".panel.is-chart");
    if (!wrap) return;

    wrap.classList.toggle("is-compact", mode === "compact");
    wrap.classList.toggle("is-standard", mode !== "compact");

    wrap.style.height = "";
  },
};