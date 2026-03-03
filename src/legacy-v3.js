import { Utils } from "./app/utils.js";
import { State } from "./app/state.js";
import { DOM } from "./app/dom.js";
import { Colors } from "./app/colors.js";
import { Readers } from "./app/readers.js";
import { ChartMapper } from "./app/ChartMapper.js";
import { ChartRenderer } from "./app/chartRenderer.js";
import { UI } from "./app/ui.js";
import { applyDrawingRowVisibility } from "./app/drawings.js";
import { applyGridColumns } from "./app/grid.js";
import { ExportActions } from "./app/export.js";
import { registerAnnotationPlugin } from "./app/plugins.js";
import { TableActions } from "./app/tableActions.js";
import { DrawingActions } from "./app/drawingActions.js";
import { KeyboardNavigation } from "./app/keyboardNavigation.js";
import { Templates } from "./app/templates.js";
import { TemplateActions } from "./app/templateActions.js";
import { Layout } from "./app/layout.js";
import { syncAndRender } from "./app/sync.js";

/* ========================================================================== */
/*  Chart JS legacy                                */
/* ========================================================================== */



/**
 * Mental Clinic Chart App — Step 1
 * - Read table + settings
 * - Build state
 * - Render Chart.js
 * - Live update on inputs
 */



/* ========================================================================== */
/*  MODULE: COLORS / SCHEMES — Clinique Saule                                  */
/* ========================================================================== */
/**
 * Remplace les HEX ci-dessous avec le brand guide officiel.
 * Garder 3 palettes max: calm / contrast / neutral.
 */




(function () {

  
    /* ======================================================================
     1.5) COLORS (Schemes Saule + apply)
     ====================================================================== */



  // ----------------------------
  // Désactivation des colors pickers à la sélection d'un thème
  // ----------------------------







  // ----------------------------
  // 6) Chart Renderer (create/update/destroy)
  // ----------------------------

// ----------------------------
// 6.5) Table Actions (CLONE-FIRST, Webflow-friendly)
// ----------------------------




  // ----------------------------
  // Ajuster le styling du tableau lorsqu'on ajoute des répondnats
  // ---











  const Events = {
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

  




/* ========================================================================== */
/*  MODULE: TEMPLATES v1 (pré-configs pour ne pas partir de zéro)              */
/* ========================================================================== */


/* ========================================================================== */
/*  TemplateActions — applique un template au DOM + State                      */
/* ========================================================================== */




  // ----------------------------
  // 9) Init
  // ----------------------------
    function init() {	
      

    if (window.ChartDataLabels) Chart.register(ChartDataLabels);
    // Valeur par défaut: si tu as déjà un bouton actif, tu peux le détecter ici.
    // Sinon, on garde "bar-vertical".	
    KeyboardNavigation.init();
	UI.syncChartTypeButtonsUI();
    registerAnnotationPlugin();
    syncAndRender();
    Events.init();
  }


  init();
})();





