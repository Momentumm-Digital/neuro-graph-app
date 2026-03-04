// src/app/grid.js

import { DOM } from "./dom.js";

export function applyGridColumns() {
  // ✅ Prend le premier header VISIBLE
  const headers = Array.from(document.querySelectorAll(".chart-row.is-header"));
  const header = headers.find((h) => h.offsetParent !== null) || headers[0];

  const table = header?.closest(".chart-table");

  const count = header
    ? header.querySelectorAll('[data-role="respondent"]').length
    : 0;

  const safe = Math.max(1, count);

  // Applique partout (robuste)
  table?.style.setProperty("--respondent-cols", String(safe));
  header?.style.setProperty("--respondent-cols", String(safe));
  document
    .querySelectorAll('.chart-row.is-data[data-row-type="data"]')
    .forEach((row) => row.style.setProperty("--respondent-cols", String(safe)));

  console.log("[grid] respondents count =", safe);
}