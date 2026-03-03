import { Utils } from "./app/utils.js";
import { State } from "./app/state.js";
import { DOM } from "./app/dom.js";
import { Colors } from "./app/colors.js";
import { Readers } from "./app/readers.js";
import { ChartMapper } from "./app/ChartMapper.js";
import { ChartRenderer } from "./app/chartRenderer.js";
import { toggleRespondentPickersDisabled } from "./app/ui.js";
import { applyDrawingRowVisibility } from "./app/drawings.js";
import { applyGridColumns } from "./app/grid.js";
import { ExportActions } from "./app/export.js";
import { registerAnnotationPlugin } from "./app/plugins.js";
import { tableActions } from "./app/tableActions.js";
import { DrawingActions } from "./app/drawingActions.js";
import { KeyboardNavigation } from "./app/keyboardNavigation.js";

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


function getAutoChartHeightPx(itemCount, density = "standard") {
  let h = 420;

  if (itemCount <= 8) h = 420;
  else if (itemCount <= 14) h = 620;
  else if (itemCount <= 20) h = 820;
  else h = 1020;

  if (density === "expanded") h = Math.round(h * 1.2); // +20%
  return h;
}


  function applyChartAutoHeight() {
    const itemCount = Array.isArray(State.rows) ? State.rows.length : 0;
    const density = State.layout?.density || "standard";

    const h = getAutoChartHeightPx(itemCount, density);

    // wrapper du canvas: idéalement un div dédié, sinon parentElement
    const wrap = DOM.canvasWrap || DOM.canvas.parentElement;
    if (!wrap) return;

    wrap.style.height = `${h}px`;

    // si chart déjà créé, il recalcule sa taille
    if (State.chart) State.chart.resize();
  }

  // ----------------------------
  // Ajuster le styling du tableau lorsqu'on ajoute des répondnats
  // ---







  function syncChartTypeButtonsUI() {
    const buttons = DOM.settingsPanel.querySelectorAll(
      '.chart-type-button[data-action="set-chart-type"]'
    );

    buttons.forEach((btn) => {
      const type = btn.getAttribute("data-chart-type");
      const isActive = type === State.chartType;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function syncAndRender() {
    State.respondents = Readers.readRespondentsFromHeader();
    State.rows = Readers.readRowsFromBody(State.respondents);
    State.drawings = Readers.readDrawings();

    const settings = Readers.readSettings();
    State.scale = settings.scale;
    State.text = settings.text;

    if (settings.colors && typeof settings.colors === "object") {
 			 State.colors = settings.colors;
			}
    
    State.layout = settings.layout || State.layout || { density: "standard" };
		applyChartAutoHeight();
    
    toggleRespondentPickersDisabled(State.colors?.enabled);

    applyDrawingRowVisibility();
    applyGridColumns();
    ChartRenderer.render();
  }

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
          syncChartTypeButtonsUI();
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

const Templates = {
  qi: {
    id: "qi",
    label: "Template 1 — QI",
    chartType: "bar-vertical",
    scale: { auto: false, min: 0, max: 100, step: 10 },
    items: [
      "Raisonnement Verbal (ICV)",
      "Raisonnement Visuospatial (IVS)",
      "Raisonnement Logique (IRF)",
      "Mémoire de Travail (IMT)",
      "Vitesse de Traitement (IVT)",
      "Potentiel Global (IAG)",
    ],
    // Respondents: laisse vide si tu veux garder ceux déjà présents
    respondents: [],
    drawings: [
      // Zone verte 25-50
      { type: "zone", zone: { min: 25, max: 50, color: "#22c55e" } },

      // Ligne gras 50
      { type: "line", line: { value: 50, style: "solid", color: "#0f172a" } },

      // Pointillées légères: 25 / 75 / 91 / 9
      { type: "line", line: { value: 25, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 75, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 91, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 9,  style: "dash", color: "#94a3b8" } },
    ],
  },

  qidi: {
    id: "qidi",
    label: "Template 2 — QI-DI",
    chartType: "bar-vertical",
    scale: { auto: false, min: 10, max: 115, step: 5 },
    items: [
      "Raisonnement Verbal (ICV)",
      "Raisonnement Visuospatial (IVS)",
      "Raisonnement Logique (IRF)",
      "Mémoire de Travail (IMT)",
      "Vitesse de Traitement (IVT)",
      "Potentiel Global (ÉGQI)",
    ],
    respondents: [],
    drawings: [
      // Zone verte 90-110
      { type: "zone", zone: { min: 90, max: 110, color: "#22c55e" } },

      // Ligne gras 100
      { type: "line", line: { value: 100, style: "solid", color: "#0f172a" } },

      // Pointillées: 70 / 55 / 40
      { type: "line", line: { value: 70, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 55, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 40, style: "dash", color: "#94a3b8" } },
    ],
  },

  attention: {
    id: "attention",
    label: "Template 3 — Attention",
    chartType: "bar-vertical",
    scale: { auto: false, min: 0, max: 100, step: 10 },
    items: [
      "Mémoire de Travail",
      "Vitesse de Traitement",
      "Att. Visuelle Sélective",
      "Att. Visuelle Soutenue",
      "Att. Auditive CT",
      "Att. Auditive Soutenue",
      "Att. Divisée",
      "Flexibilité Att.",
      "Inhibition Motrice 1",
      "Inhibition Motrice 2",
      "Inhibition Verbale",
      "Planification",
    ],
    respondents: [],
    drawings: [
      { type: "zone", zone: { min: 25, max: 50, color: "#22c55e" } },
      { type: "line", line: { value: 50, style: "solid", color: "#0f172a" } },
      { type: "line", line: { value: 25, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 75, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 91, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 9,  style: "dash", color: "#94a3b8" } },
    ],
  },

  basc3: {
    id: "basc3",
    label: "Template 4 — BASC-3",
    chartType: "bar-vertical",
    scale: { auto: false, min: 30, max: 90, step: 5 },
    items: [
      "Hyperactivité/Impulsivité",
      "Agressivité",
      "Pb. de conduite",
      "Pb. d'externalisation",
      "Anxiété",
      "Dépression",
      "Pb. d'internalisation",
      "Inattention",
      "Anomalie",
      "Retrait",
      "Sx. Comportementaux",
      "Adaptabilité",
      "Habiletés sociales",
      "Leadership",
      "Comm. fonctionnelle",
      "Activité vie quotidienne",
      "Habiletés adaptatives",
    ],
    respondents: ["Parent 1", "Parent 2", "Enseignant"],
    drawings: [
      // Zones (couleurs de base — on pourra faire un dégradé plus tard)
      { type: "zone", zone: { min: 30, max: 60, color: "#22c55e" } }, // vert
      { type: "zone", zone: { min: 60, max: 70, color: "#facc15" } }, // jaune
      { type: "zone", zone: { min: 70, max: 80, color: "#fb923c" } }, // orange
      { type: "zone", zone: { min: 80, max: 90, color: "#ef4444" } }, // rouge

      // Lignes pointillées
      { type: "line", line: { value: 60, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 70, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 80, style: "dash", color: "#94a3b8" } },
    ],
  },
};

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
	syncChartTypeButtonsUI();
    registerAnnotationPlugin();
    syncAndRender();
    Events.init();
  }


  init();
})();





