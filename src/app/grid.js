// src/app/grid.js

import { State } from "./state.js";
import { DOM } from "./dom.js";

export function applyGridColumns() {
  const count = State.respondents.length;

  const rows = DOM.table?.querySelectorAll(".chart-row");
  if (!rows) return;

  rows.forEach((row) => {
    row.style.setProperty("--respondent-cols", String(count));
  });
}