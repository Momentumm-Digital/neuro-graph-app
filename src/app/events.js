
import { State } from "./state.js";
import { DOM } from "./dom.js";
import { UI } from "./ui.js";
import { ExportActions } from "./export.js";
import { TableActions } from "./tableActions.js";
import { DrawingActions } from "./drawingActions.js";
import { TemplateActions } from "./templateActions.js";
import { syncAndRender } from "./sync.js";



  export const Events = {
  init() {
    // 1) Live update: tableau
    DOM.table.addEventListener("input", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;

      if (
        t.matches('input[data-role="item"]') ||
        t.matches('input[data-role="score"]') ||
        t.matches('input[data-role="respondent"]') ||
        t.matches('input[data-role="respondent-color"]')
      ) {
        syncAndRender();
      }
    });

    // 2) Live update: settings panel (input)
    DOM.settingsPanel.addEventListener("input", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;

      if (t.matches("[data-setting]")) {
        syncAndRender();
      }
    });

    // 3) Live update: settings panel (change) ✅ (select / checkbox)
    DOM.settingsPanel.addEventListener("change", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;

      // Bonus UX: si on choisit un scheme, on active le toggle
      if (t.matches('[data-setting="color-scheme"]')) {
        const toggle = DOM.settingsPanel.querySelector(
          '[data-setting="colors-enabled"]'
        );
        if (toggle && !toggle.checked) toggle.checked = true;
      }

      if (t.matches("[data-setting]")) {
        syncAndRender();
      }
    });

    // 4) Actions: boutons
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-action");

      if (action === "set-chart-type") {
        const chartType = btn.getAttribute("data-chart-type");
        if (chartType === "bar-vertical" || chartType === "bar-horizontal" || chartType === "line") {
          State.chartType = chartType;
          UI.syncChartTypeButtonsUI();
          syncAndRender();
        }
        return;
      }
        
        

     if (action === "apply-template") {
        const templateId = btn.getAttribute("data-template-id");

        State.templateId = templateId;
        UI.syncActiveGroup("template", templateId);

        TemplateActions.apply(templateId);
        return;
     }
        
      if (action === "add-item") {
        TableActions.addRowToEnd();
        syncAndRender();
        return;
      }


  // 3) Table: reset
  if (action === "reset-table") {
    TableActions.resetTable();
    syncAndRender();
    return;
  }

  // 4) Table: add row after
  if (action === "add-row-after") {
    const rowEl = btn.closest('.chart-row.is-data[data-row-type="data"]');
    if (!rowEl) return;
    TableActions.addRowAfter(rowEl);
    syncAndRender();
    return;
  }

  // 5) Table: delete row
  if (action === "delete-row") {
    const rowEl = btn.closest('.chart-row.is-data[data-row-type="data"]');
    if (!rowEl) return;
    TableActions.deleteRow(rowEl);
    syncAndRender();
    return;
  }
  
  if (action === "add-respondent") {
    TableActions.addRespondent();
    syncAndRender();
    return;
    }
    if (action === "delete-respondent") {
    const headerCell = btn.closest('.chart-cell[data-col]');
    const colId = headerCell?.getAttribute("data-col");
    if (!colId) return;

    TableActions.deleteRespondent(colId);
    syncAndRender(); // relit, update chart + applyGridColumns()
    return;
  }	
  
    if (action === "add-drawing-row") {
    DrawingActions.addRow();
    syncAndRender();
    return;
  }

  if (action === "delete-drawing-row") {
    DrawingActions.deleteRow(btn);
    syncAndRender();
    return;
  }
  
  if (action === "export-chart") {
    ExportActions.exportChartPng();
    return;
  }



      });
    },
  };
