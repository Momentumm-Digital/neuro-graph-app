// src/app/ui.js
import { DOM } from "./dom.js";
import { State } from "./state.js";

export const UI = {

toggleRespondentPickersDisabled(enabled) {
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
  },
  
  syncChartTypeButtonsUI() {
    const buttons = DOM.settingsPanel.querySelectorAll(
      '.chart-type-button[data-action="set-chart-type"]'
      );

      buttons.forEach((btn) => {
        const type = btn.getAttribute("data-chart-type");
        const isActive = type === State.chartType;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
  },

  syncActiveGroup(group, activeValue) {
    const els = DOM.settingsPanel.querySelectorAll(
      `[data-ui-group="${group}"]`
    );

    els.forEach((el) => {
      const v = el.getAttribute("data-ui-value");
      const isActive = v === activeValue;

      el.classList.toggle("is-active", isActive);
      el.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }
    

};












