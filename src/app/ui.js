// src/app/ui.js
import { DOM } from "./dom.js";
import { State } from "./state.js";

export const UI = {
  toggleRespondentPickersDisabled(enabled) {
    const headerRow = DOM.table?.querySelector(
      '.chart-row.is-header[data-row-type="head"]'
    );
    if (!headerRow) return;

    const pickers = headerRow.querySelectorAll(".color-input-wrap");

    pickers.forEach((picker) => {
      const input = picker.querySelector('input[data-role="respondent-color"]');
      const current = picker.querySelector(".color-current");
      const swatches = picker.querySelectorAll(".color-swatch");

      if (input) input.disabled = enabled;

      // classe utilitaire pour ton CSS Webflow si tu veux
      picker.classList.toggle("is-disabled", enabled);

      if (current) {
        current.style.opacity = enabled ? "0.5" : "";
        current.style.cursor = enabled ? "not-allowed" : "";
      }

      swatches.forEach((swatch) => {
        swatch.style.opacity = enabled ? "0.5" : "";
        swatch.style.cursor = enabled ? "not-allowed" : "pointer";
      });
    });
  },

  syncRespondentColorPickers() {
    const headerRow = DOM.table?.querySelector(
      '.chart-row.is-header[data-row-type="head"]'
    );
    if (!headerRow) return;

    const pickers = headerRow.querySelectorAll(".color-input-wrap");

    pickers.forEach((picker) => {
      const input = picker.querySelector('input[data-role="respondent-color"]');
      const current = picker.querySelector(".color-current");

      if (!input || !current) return;

      current.style.backgroundColor = input.value || "#000000";
    });
  },

    syncAllColorPickers(scope = document) {
    scope.querySelectorAll(".color-input-wrap").forEach((picker) => {
      const input = picker.querySelector(
        'input[data-role$="-color"], input[data-setting$="-color"]'
      );
      const current = picker.querySelector(".color-current");

      if (!input || !current) return;

      current.style.backgroundColor = input.value || "#000000";
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