// src/app/grid.js

import { State } from "./app/state.js";
import { DOM } from "./app/dom.js";
import { applyDrawingRowVisibility } from "./app/drawings.js";




export const TemplateActions = {
    apply(templateId) {
      const tpl = Templates[templateId];
      if (!tpl) return;

      // 1) Chart type
      State.chartType = tpl.chartType;

      // 2) Scale settings (panel)
      this.setInput('[data-setting="scale-auto"]', false, "checkbox");
      this.setInput('[data-setting="scale-min"]', tpl.scale.min);
      this.setInput('[data-setting="scale-max"]', tpl.scale.max);
      this.setInput('[data-setting="step"]', tpl.scale.step);

      // 3) Items (rows)
      this.ensureRowCount(tpl.items.length);
      this.setItems(tpl.items);

      // 4) Respondents (optional)
      if (Array.isArray(tpl.respondents) && tpl.respondents.length) {
        this.ensureRespondentCount(tpl.respondents.length);
        this.setRespondentNames(tpl.respondents);
      }

      // 5) Drawings (annotations)
      this.ensureDrawingRowCount(tpl.drawings.length);
      this.setDrawings(tpl.drawings);

      // 6) UI buttons active + render
      syncChartTypeButtonsUI();
      applyDrawingRowVisibility();
      syncAndRender();
    },

    // ----- Helpers
    setInput(selector, value, kind = "text") {
      const el = DOM.settingsPanel.querySelector(selector);
      if (!el) return;
      if (kind === "checkbox") el.checked = !!value;
      else el.value = value ?? "";
    },

    ensureRowCount(targetCount) {
      const body = DOM.table.querySelector(".chart-table_body");
      if (!body) return;

      let rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));

      while (rows.length < targetCount) {
        TableActions.addRowToEnd();
        rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
      }
      while (rows.length > targetCount) {
        rows[rows.length - 1].remove();
        rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
      }
    },

    setItems(items) {
      const body = DOM.table.querySelector(".chart-table_body");
      const rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
      rows.forEach((rowEl, i) => {
        const itemInput = rowEl.querySelector('input[data-role="item"]');
        if (itemInput) itemInput.value = items[i] || "";
      });
    },

    ensureRespondentCount(targetCount) {
      // Sync with current State.respondents length by adding/removing columns
      // Important: State.respondents sera relu dans syncAndRender()
      syncAndRender(); // refresh State.respondents
      let current = State.respondents.length;

      while (current < targetCount) {
        TableActions.addRespondent();
        syncAndRender();
        current = State.respondents.length;
      }

      while (current > targetCount) {
        // delete last
        const last = State.respondents[State.respondents.length - 1];
        if (!last?.colId) break;
        TableActions.deleteRespondent(last.colId);
        syncAndRender();
        current = State.respondents.length;
      }
    },

    setRespondentNames(names) {
      const headerRow = DOM.table.querySelector('.chart-row.is-header[data-row-type="head"]');
      if (!headerRow) return;

      const cells = Array.from(headerRow.querySelectorAll('.chart-cell[data-col]'));
      cells.forEach((cell, i) => {
        const nameInput = cell.querySelector('input[data-role="respondent"]');
        if (nameInput) nameInput.value = names[i] || nameInput.value;
      });
    },

    ensureDrawingRowCount(targetCount) {
      let rows = Array.from(DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));

      while (rows.length < targetCount) {
        DrawingActions.addRow();
        rows = Array.from(DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));
      }
      while (rows.length > targetCount) {
        rows[rows.length - 1].remove();
        rows = Array.from(DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));
      }
    },

    setDrawings(drawings) {
      const rows = Array.from(DOM.settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));

      rows.forEach((rowEl, i) => {
        const d = drawings[i];
        if (!d) return;

        // type
        const typeSel = rowEl.querySelector('[data-setting="draw-type"]');
        if (typeSel) typeSel.value = d.type;

        // zone fields
        rowEl.querySelector('[data-setting="zone-min"]')?.setAttribute("value", "");
        rowEl.querySelector('[data-setting="zone-max"]')?.setAttribute("value", "");
        const zMin = rowEl.querySelector('[data-setting="zone-min"]');
        const zMax = rowEl.querySelector('[data-setting="zone-max"]');
        const zCol = rowEl.querySelector('[data-setting="zone-color"]');

        if (zMin) zMin.value = d.zone?.min ?? "";
        if (zMax) zMax.value = d.zone?.max ?? "";
        if (zCol) zCol.value = d.zone?.color ?? "#22c55e";

        // line fields
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