// src/app/grid.js

import { DOM } from "./dom.js";


export function applyGridColumns() {
  const count = document.querySelectorAll(
    '.chart-row.is-header [data-role="respondent"]'
  ).length;

  const safe = Math.max(1, count);
  DOM.table.style.setProperty("--respondent-cols", String(safe));
}