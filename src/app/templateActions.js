// src/app/templateActions.js



import { State } from "./state.js";
import { DOM } from "./dom.js";
import { applyDrawingRowVisibility } from "./drawings.js";
import { TableActions } from "./tableActions.js";
import { DrawingActions } from "./drawingActions.js";
import { Templates } from "./templates.js";
import { UI } from "./ui.js";
import { syncAndRender } from "./sync.js";




export const TemplateActions = {
  apply(templateId) {
    const tpl = Templates[templateId];
    if (!tpl) return;

    // 1) Chart type
    State.chartType = tpl.chartType || "bar-vertical";

    // 2) Scale settings
    this.setInput(
      '[data-setting="scale-auto"]',
      tpl.scale?.auto ?? true,
      "checkbox"
    );
    this.setInput('[data-setting="scale-min"]', tpl.scale?.min ?? "");
    this.setInput('[data-setting="scale-max"]', tpl.scale?.max ?? "");
    this.setInput('[data-setting="step"]', tpl.scale?.step ?? "");

    // 3) Text settings
    this.setInput(
      '[data-setting="show-legend"]',
      tpl.text?.showLegend ?? true,
      "checkbox"
    );
    this.setInput(
      '[data-setting="show-title"]',
      tpl.text?.showTitle ?? false,
      "checkbox"
    );
    this.setInput(
      '[data-setting="show-x"]',
      tpl.text?.showX ?? true,
      "checkbox"
    );
    this.setInput(
      '[data-setting="show-y"]',
      tpl.text?.showY ?? true,
      "checkbox"
    );
    this.setInput(
      '[data-setting="show-values"]',
      tpl.text?.showValues ?? false,
      "checkbox"
    );

    // 4) Colors settings
    this.setInput(
      '[data-setting="colors-enabled"]',
      tpl.colors?.enabled ?? false,
      "checkbox"
    );
    this.setInput(
      '[data-setting="color-scheme"]',
      tpl.colors?.scheme ?? "calm"
    );

    // 5) Layout settings
    this.setRadioInput(
      '[data-setting="layout-density"]',
      tpl.layout?.density ?? "standard"
    );

    // 6) Rows / items
    this.ensureRowCount(Math.max(1, tpl.items?.length || 1));
    this.setItems(tpl.items || [""]);

    // 7) Respondents
    this.ensureRespondentCount(Math.max(1, tpl.respondents?.length || 1));
    this.setRespondentNames(tpl.respondents || [""]);
    this.resetRespondentColors();

    // 8) Reset de tous les scores
    this.resetAllScores();

    // 9) Drawings / annotations
    this.ensureDrawingRowCount(Math.max(1, tpl.drawings?.length || 1));

    if (tpl.drawings && tpl.drawings.length) {
      this.setDrawings(tpl.drawings);
    } else {
      this.clearDrawings();
    }

    // 10) UI sync
    UI.syncChartTypeButtonsUI();
    applyDrawingRowVisibility();
    syncAndRender();
  },



  resetAllScores() {
  const body = DOM.table.querySelector(".chart-table_body");
  if (!body) return;

  const scoreInputs = body.querySelectorAll('input[data-role="score"]');
  scoreInputs.forEach((input) => {
    input.value = "0";
  });
},

  setInput(selector, value, kind = "text") {
    const el = DOM.settingsPanel.querySelector(selector);
    if (!el) return;

    if (kind === "checkbox") {
      el.checked = !!value;
    } else {
      el.value = value ?? "";
    }
  },

  setRadioInput(selector, value) {
    const radios = DOM.settingsPanel.querySelectorAll(selector);
    radios.forEach((radio) => {
      radio.checked = radio.value === value;
    });
  },

  ensureRowCount(targetCount) {
    const body = DOM.table.querySelector(".chart-table_body");
    if (!body) return;

    let rows = Array.from(
      body.querySelectorAll('.chart-row.is-data[data-row-type="data"]')
    );

    while (rows.length < targetCount) {
      TableActions.addRowToEnd();
      rows = Array.from(
        body.querySelectorAll('.chart-row.is-data[data-row-type="data"]')
      );
    }

    while (rows.length > targetCount) {
      rows[rows.length - 1].remove();
      rows = Array.from(
        body.querySelectorAll('.chart-row.is-data[data-row-type="data"]')
      );
    }
  },

  setItems(items) {
    const body = DOM.table.querySelector(".chart-table_body");
    if (!body) return;

    const rows = Array.from(
      body.querySelectorAll('.chart-row.is-data[data-row-type="data"]')
    );

    rows.forEach((rowEl, i) => {
      const itemInput = rowEl.querySelector('input[data-role="item"]');
      if (itemInput) itemInput.value = items[i] ?? "";

      rowEl.querySelectorAll('input[data-role="score"]').forEach((inp) => {
        inp.value = "0";
      });
    });
  },

  ensureRespondentCount(targetCount) {
    syncAndRender();
    let current = State.respondents.length;

    while (current < targetCount) {
      TableActions.addRespondent();
      syncAndRender();
      current = State.respondents.length;
    }

    while (current > targetCount) {
      const last = State.respondents[State.respondents.length - 1];
      if (!last?.colId) break;
      TableActions.deleteRespondent(last.colId);
      syncAndRender();
      current = State.respondents.length;
    }
  },

  setRespondentNames(names) {
    const headerRow = DOM.table.querySelector(
      '.chart-row.is-header[data-row-type="head"]'
    );
    if (!headerRow) return;

    const cells = Array.from(headerRow.querySelectorAll('.chart-cell[data-col]'));

    cells.forEach((cell, i) => {
      const nameInput = cell.querySelector('input[data-role="respondent"]');
      if (nameInput) nameInput.value = names[i] ?? "";
    });
  },

  resetRespondentColors() {
    const headerRow = DOM.table.querySelector(
      '.chart-row.is-header[data-row-type="head"]'
    );
    if (!headerRow) return;

    const cells = Array.from(headerRow.querySelectorAll('.chart-cell[data-col]'));

    cells.forEach((cell) => {
      const colorInput = cell.querySelector('input[data-role="respondent-color"]');
      if (colorInput) colorInput.value = "#000000";
    });
  },

  ensureDrawingRowCount(targetCount) {
    let rows = Array.from(
      DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]')
    );

    while (rows.length < targetCount) {
      DrawingActions.addRow();
      rows = Array.from(
        DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]')
      );
    }

    while (rows.length > targetCount) {
      rows[rows.length - 1].remove();
      rows = Array.from(
        DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]')
      );
    }
  },

  clearDrawings() {
    const rows = Array.from(
      DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]')
    );

    rows.forEach((rowEl, index) => {
      const typeSel = rowEl.querySelector('[data-setting="draw-type"]');
      const zMin = rowEl.querySelector('[data-setting="zone-min"]');
      const zMax = rowEl.querySelector('[data-setting="zone-max"]');
      const zCol = rowEl.querySelector('[data-setting="zone-color"]');
      const lVal = rowEl.querySelector('[data-setting="line-value"]');
      const lSty = rowEl.querySelector('[data-setting="line-style"]');
      const lCol = rowEl.querySelector('[data-setting="line-color"]');

      if (index === 0) {
        if (typeSel) typeSel.value = "line";
        if (zMin) zMin.value = "";
        if (zMax) zMax.value = "";
        if (zCol) zCol.value = "#22c55e";
        if (lVal) lVal.value = "";
        if (lSty) lSty.value = "solid";
        if (lCol) lCol.value = "#0f172a";
      } else {
        rowEl.remove();
      }
    });
  },

  setDrawings(drawings) {
    const rows = Array.from(
      DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]')
    );

    rows.forEach((rowEl, i) => {
      const d = drawings[i];
      if (!d) return;

      const typeSel = rowEl.querySelector('[data-setting="draw-type"]');
      if (typeSel) typeSel.value = d.type;

      const zMin = rowEl.querySelector('[data-setting="zone-min"]');
      const zMax = rowEl.querySelector('[data-setting="zone-max"]');
      const zCol = rowEl.querySelector('[data-setting="zone-color"]');

      if (zMin) zMin.value = d.zone?.min ?? "";
      if (zMax) zMax.value = d.zone?.max ?? "";
      if (zCol) zCol.value = d.zone?.color ?? "#22c55e";

      const lVal = rowEl.querySelector('[data-setting="line-value"]');
      const lSty = rowEl.querySelector('[data-setting="line-style"]');
      const lCol = rowEl.querySelector('[data-setting="line-color"]');

      if (lVal) lVal.value = d.line?.value ?? "";
      if (lSty) lSty.value = d.line?.style ?? "solid";
      if (lCol) lCol.value = d.line?.color ?? "#0f172a";
    });

    applyDrawingRowVisibility();
  },
};