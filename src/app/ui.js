// src/app/ui.js
import { DOM } from "./dom.js";

export function toggleRespondentPickersDisabled(enabled) {
  const headerRow = DOM.table?.querySelector(
    '.chart-row.is-header[data-row-type="head"]'
  );
  if (!headerRow) return;

  const pickers = headerRow.querySelectorAll(
    'input[data-role="respondent-color"]'
  );

  pickers.forEach((input) => {
    input.disabled = enabled;

    if (enabled) {
      input.style.opacity = "0.5";
      input.style.cursor = "not-allowed";
    } else {
      input.style.opacity = "";
      input.style.cursor = "";
    }
  });
}