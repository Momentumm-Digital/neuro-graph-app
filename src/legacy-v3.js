

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
  // ----------------------------
  // 1) Utils (petites fonctions pures)
  // ----------------------------
  const Utils = {
    uid(prefix = "row") {
      // Unique simple: row-<time>-<random>
      return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    },
    toNumber(value, fallback = 0) {
      const n = Number(value);
      return Number.isFinite(n) ? n : fallback;
    },
    clamp(n, min, max) {
      return Math.min(max, Math.max(min, n));
    },
    qs(root, sel) {
      return root.querySelector(sel);
    },
    qsa(root, sel) {
      return Array.from(root.querySelectorAll(sel));
    },
    
     hexToRgba(hex, alpha = 0.12) {
      if (!hex || typeof hex !== "string") return null;
      const h = hex.replace("#", "").trim();
      if (h.length !== 6) return null;

      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);

      if (![r, g, b].every(Number.isFinite)) return null;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },

		

    
  };
  
  
  
    /* ======================================================================
     1.5) COLORS (Schemes Saule + apply)
     ====================================================================== */

const SAULE_SCHEMES = {
  calm: ["#2F6B4F", "#3D8C6E", "#78C2A4", "#BFE9D7", "#E7F7F1"],
  contrast: ["#1F6F8B", "#155368", "#99C7D6", "#6FAFC3", "#E6F2F5"],
  neutral: ["#111827", "#374151", "#6B7280", "#9CA3AF", "#E5E7EB"],
};

const Colors = {
  getScheme(name) {
    return SAULE_SCHEMES[name] || SAULE_SCHEMES.calm;
  },
  applyScheme(chart, schemeName, opts = {}) {
    if (!chart) return;

    const palette = Colors.getScheme(schemeName);
    const fillAlpha = typeof opts.fillAlpha === "number" ? opts.fillAlpha : 0.18;
    const borderWidth = typeof opts.borderWidth === "number" ? opts.borderWidth : 2;

    (chart.data.datasets || []).forEach((ds, i) => {
      const c = palette[i % palette.length];
      ds.borderColor = c;
      ds.backgroundColor = Utils.hexToRgba(c, fillAlpha) || c;
      ds.borderWidth = borderWidth;
    });

    if (opts.update !== false) chart.update();
  },
};


  // ----------------------------
  // Désactivation des colors pickers à la sélection d'un thème
  // ----------------------------

  function toggleRespondentPickersDisabled(enabled) {
    const headerRow = DOM.table.querySelector(
      '.chart-row.is-header[data-row-type="head"]'
    );
    if (!headerRow) return;

    const pickers = headerRow.querySelectorAll(
      'input[data-role="respondent-color"]'
    );

    pickers.forEach((input) => {
      input.disabled = enabled;

      // effet visuel léger
      if (enabled) {
        input.style.opacity = "0.5";
        input.style.cursor = "not-allowed";
      } else {
        input.style.opacity = "";
        input.style.cursor = "";
      }
    });
  }







  // ----------------------------
  // 2) DOM Cache (un seul endroit pour attraper le DOM)
  // ----------------------------
  const DOM = {
    table: document.querySelector(".chart-table"),
    settingsPanel: document.querySelector('[data-ui="settings-panel"]'),
    canvas: document.querySelector("#chart-canvas"),
  };

  if (!DOM.table || !DOM.settingsPanel || !DOM.canvas) {
    console.warn(
      "[ChartApp] DOM missing. Need .chart-table, [data-ui=settings-panel], #chart-canvas"
    );
    return;
  }

  // ----------------------------
  // 3) State (source de vérité)
  // ----------------------------
  const State = {
    // data
    respondents: [], // [{ colId:"r1", name:"", color:"#000000" }, ...]
    rows: [], // [{ id:"row-xxx", item:"", scores:{ r1:12, r2:34 } }, ...]
		drawings: [],

    // settings
    chartType: "bar-vertical", // "bar-vertical" | "bar-horizontal" | "line"
    scale: {
      auto: true,
      step: null,
      min: null,
      max: null,
    },
    text: {
      showLegend: true,
      showTitle: false,
      showX: true,
      showY: true,	
      showValues: false, 
    },
     colors: {
      enabled: false,     // ✅ par défaut: on garde tes color pickers actuels
      scheme: "calm",     // "calm" | "contrast" | "neutral"
    },

    // runtime
    chart: null,
  };

  // ----------------------------
  // 4) Readers: DOM -> State (table + settings)
  // ----------------------------
  const Readers = {
    readRespondentsFromHeader() {
      // On lit les cellules du header qui ont data-col="r1", "r2"...
      const headerRow = DOM.table.querySelector(
        '.chart-row.is-header[data-row-type="head"]'
      );
      if (!headerRow) return [];

      const respondentCells = Utils.qsa(headerRow, '.chart-cell[data-col]');
      return respondentCells.map((cell) => {
        const colId = cell.getAttribute("data-col");

        const nameInput = cell.querySelector('input[data-role="respondent"]');
        const colorInput = cell.querySelector(
          'input[data-role="respondent-color"]'
        );

        return {
          colId,
          name: nameInput ? nameInput.value.trim() : colId,
          color: colorInput ? colorInput.value : "#000000",
        };
      });
    },

    readRowsFromBody(respondents) {
      const body = DOM.table.querySelector(".chart-table_body");
      if (!body) return [];

      const dataRows = Utils.qsa(
        body,
        '.chart-row.is-data[data-row-type="data"]'
      );

      return dataRows.map((rowEl) => {
        const id = rowEl.getAttribute("data-row-id") || Utils.uid("row");

        const itemInput = rowEl.querySelector('input[data-role="item"]');
        const item = itemInput ? itemInput.value.trim() : "";

        const scores = {};
        respondents.forEach((r) => {
          const scoreCell = rowEl.querySelector(`.chart-cell[data-col="${r.colId}"]`);
          const scoreInput = scoreCell
            ? scoreCell.querySelector('input[data-role="score"]')
            : null;

          // NOTE: si vide, on garde 0 (tu pourras changer la logique plus tard)
          const value = scoreInput ? Utils.toNumber(scoreInput.value, 0) : 0;
          scores[r.colId] = value;
        });

        return { id, item, scores };
      });
    },

    readSettings() {
      const panel = DOM.settingsPanel;

      // chart type: bouton actif via click (on le stocke dans State)
      // Ici on lit juste la value actuelle dans State, mais on peut aussi
      // détecter un bouton "active" si tu as une classe.
      const scaleAuto = panel.querySelector('[data-setting="scale-auto"]');
      const step = panel.querySelector('[data-setting="step"]');
      const min = panel.querySelector('[data-setting="scale-min"]');
      const max = panel.querySelector('[data-setting="scale-max"]');

      const showLegend = panel.querySelector('[data-setting="show-legend"]');
      const showTitle = panel.querySelector('[data-setting="show-title"]');
      const showX = panel.querySelector('[data-setting="show-x"]');
      const showY = panel.querySelector('[data-setting="show-y"]');
      const showValues = panel.querySelector('[data-setting="show-values"]');
      const colorsEnabled = panel.querySelector('[data-setting="colors-enabled"]');
      const colorScheme = panel.querySelector('[data-setting="color-scheme"]');
			const density = panel.querySelector('[data-setting="layout-density"]:checked');

      return {
        scale: {
          auto: scaleAuto ? !!scaleAuto.checked : true,
          step: step && step.value !== "" ? Utils.toNumber(step.value, null) : null,
          min: min && min.value !== "" ? Utils.toNumber(min.value, null) : null,
          max: max && max.value !== "" ? Utils.toNumber(max.value, null) : null,
        },
        text: {
          showLegend: showLegend ? !!showLegend.checked : true,
          showTitle: showTitle ? !!showTitle.checked : false,
          showX: showX ? !!showX.checked : true,
          showY: showY ? !!showY.checked : true,		
          showValues: showValues ? !!showValues.checked : true,	
        },
        colors: {
          enabled: colorsEnabled ? !!colorsEnabled.checked : false,
          scheme: colorScheme ? colorScheme.value : "calm",
        },
        layout: {
          density: density ? density.value : "standard",
        },
      };
    },
    
    
   readDrawings() {
    const rows = Array.from(
      DOM.settingsPanel.querySelectorAll(".param-row[data-drawing-id]")
    );

    return rows.map((row) => {
      const id = row.getAttribute("data-drawing-id");

      const type = row.querySelector('[data-setting="draw-type"]')?.value ||"line";

      // champs zone
      const zoneMin = row.querySelector('[data-setting="zone-min"]')?.value ?? "";
      const zoneMax = row.querySelector('[data-setting="zone-max"]')?.value ?? "";
	
 			// champs couleur pour lignes et zones
      const zoneColor =
      row.querySelector('[data-setting="zone-color"]')?.value || null;
			const lineColor = 
      row.querySelector('[data-setting="line-color"]')?.value || null;

  
      // champs line
      const lineStyle = row.querySelector('[data-setting="line-style"]')?.value || "solid";
      const lineValue = row.querySelector('[data-setting="line-value"]')?.value ?? "";

      return {
        id,
        type,
        zone: {
          min: zoneMin === "" ? null : Utils.toNumber(zoneMin, null),
          max: zoneMax === "" ? null : Utils.toNumber(zoneMax, null),
          color: zoneColor,
        },
        line: {
          style: lineStyle,
          value: lineValue === "" ? null : Utils.toNumber(lineValue, null),
          color: lineColor, 
        },
      };
    });
  },
  
  };

// ----------------------------
// 5) Mapper State -> Chart.js config
// ----------------------------
const ChartMapper = {
  // ----------------------------
  // A) Build Chart.js "data" from State
  // ----------------------------
  buildChartData() {
    const labels = State.rows.map((r) => r.item || "—");

    const datasets = State.respondents.map((resp) => ({
      label: resp.name || resp.colId,
      data: State.rows.map((row) =>
        Utils.toNumber(row.scores?.[resp.colId], 0)
      ),
      borderColor: resp.color,
      backgroundColor: resp.color,
      fill: false,
      tension: 0.25,
    }));

    // ✅ Debug (retire quand c'est stable)
    console.log("[ChartMapper] buildChartData()", { labels, datasets });

    return { labels, datasets };
  },

  // ----------------------------
  // B) Build Chart.js Annotations (plugin) from State.drawings
  // ----------------------------
  buildAnnotations() {
    const annotations = {};

    const isHorizontal = State.chartType === "bar-horizontal";
    const valueAxis = isHorizontal ? "x" : "y";

    const drawings = Array.isArray(State.drawings) ? State.drawings : [];

    drawings.forEach((d) => {
      if (!d?.id) return;

      // ---- LINE
      if (d.type === "line" && d.line?.value !== null) {	
      const color = d.line?.color || "rgba(0,0,0,0.6)";
        annotations[d.id] = {
          type: "line",
          scaleID: valueAxis,
          value: d.line.value,
					borderColor: color,          
          borderWidth: 2,
          borderDash: d.line.style === "dash" ? [6, 6] : undefined,
        };
      }

      // ---- ZONE
if (d.type === "zone" && d.zone?.min !== null && d.zone?.max !== null) {
  const color = d.zone.color
  ? Utils.hexToRgba(d.zone.color, 0.12)
  : "rgba(0,0,0,0.08)";


  annotations[d.id] = !isHorizontal

          ? {
              type: "box",
              yMin: d.zone.min,
              yMax: d.zone.max,
              backgroundColor: color,
              borderWidth: 0,
            }
          : {
              type: "box",
              xMin: d.zone.min,
              xMax: d.zone.max,
              backgroundColor: color,
              borderWidth: 0,
            };
      }
    });

    // ✅ Debug (retire quand c'est stable)
    console.log("[ChartMapper] buildAnnotations()", { annotations });

    return annotations;
  },

  // ----------------------------
  // C) Convert our app chartType + settings -> Chart.js type + options
  // ----------------------------
  getChartJsTypeAndOptions() {
    const isHorizontal = State.chartType === "bar-horizontal";
    const isLine = State.chartType === "line";

    const chartJsType = isLine ? "line" : "bar";

    /*const options = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: { display: State.text.showLegend },
        title: { display: State.text.showTitle, text: "Résultats" },

        // ✅ Annotations plugin
        annotation: {
          annotations: this.buildAnnotations(), // ✅ use this (robust)
        },
      },

      scales: {
        x: {
          display: State.text.showX,
          beginAtZero: true,
        },
        y: {
          display: State.text.showY,
          beginAtZero: true,
        },
      },
    };*/

    const options = {
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: 20,
      },

      plugins: {
        legend: {
          display: State.text.showLegend,
          position: "top",
          labels: {
            color: "#334155",
            font: {
              size: 13,
              weight: "500",
            },
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
          },
        },

       /* title: {
          display: State.text.showTitle,
          text: "Résultats",
          color: "#0f172a",
          font: {
            size: 18,
            weight: "600",
          },
          padding: {
            bottom: 20,
          },
        },*/

        annotation: {
          annotations: this.buildAnnotations(), // ✅ on garde ton plugin
        },

        datalabels: {
          display: !!State.text.showValues,           // ✅ on/off
          formatter: (v) => (v === 0 ? "" : v),       // évite de polluer avec des 0
          anchor: "end",
          align: "end",
          clamp: true,
        },


        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#0f172a",
          bodyColor: "#334155",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
        },
      },

      scales: {
        x: {
          display: State.text.showX,
          grid: {
            display: false,
          },
          ticks: {
            color: "#64748b",
            font: {
              size: 12,
            },
          },
          border: {
            display: false,
          },
        },

        y: {
          display: State.text.showY,
          beginAtZero: true,
          grid: {
            color: "#e2e8f0",
            drawBorder: false,
          },
          ticks: {
            color: "#64748b",
            font: {
              size: 12,
            },
            stepSize: 10,
          },
          border: {
            display: false,
          },
        },
      },

      elements: {
        bar: {
          borderRadius: 6,
        },
        line: {
          tension: 0.4,
          borderWidth: 2,
        },
        point: {
          radius: 4,
          hoverRadius: 6,
          borderWidth: 2,
        },
      },
    };




    // Bar horizontal (Chart.js) = indexAxis: 'y'
    if (!isLine) {
      options.indexAxis = isHorizontal ? "y" : "x";
    }

    // Scale logique: si auto ON => on n’impose rien
    if (!State.scale.auto) {
      const targetAxis = isHorizontal ? "x" : "y"; // l’axe des valeurs
      const axis = options.scales[targetAxis];

      if (State.scale.min !== null) axis.min = State.scale.min;
      if (State.scale.max !== null) axis.max = State.scale.max;
      if (State.scale.step !== null) {
        axis.ticks = axis.ticks || {};
        axis.ticks.stepSize = State.scale.step;
      }
    }

    // ✅ Debug (retire quand c'est stable)
    console.log("[ChartMapper] getChartJsTypeAndOptions()", {
      chartJsType,
      options,
    });

    return { chartJsType, options };
  },
};

  // ----------------------------
  // 6) Chart Renderer (create/update/destroy)
  // ----------------------------
const ChartRenderer = {
  render() {
    const ctx = DOM.canvas.getContext("2d");
    const data = ChartMapper.buildChartData();
    const { chartJsType, options } = ChartMapper.getChartJsTypeAndOptions();

    if (State.chart) {
      State.chart.destroy();
      State.chart = null;
    }

    State.chart = new Chart(ctx, {
      type: chartJsType,
      data,
      options,
    });

    // ✅ Thème: ré-appliquer après CHAQUE new Chart()
    if (State.colors?.enabled) {
      Colors.applyScheme(State.chart, State.colors.scheme, {
        fillAlpha: 0.18,
        borderWidth: 2,
        update: false, // <-- IMPORTANT
      });
    }

    // ✅ un seul update final
    State.chart.update();
  },
};

// ----------------------------
// 6.5) Table Actions (CLONE-FIRST, Webflow-friendly)
// ----------------------------
const TableActions = {
  // ---- Helpers DOM
  getBody() {
    return DOM.table.querySelector(".chart-table_body");
  },
  getHeaderRow() {
    return DOM.table.querySelector('.chart-row.is-header[data-row-type="head"]');
  },
  getDataRows() {
    const body = this.getBody();
    if (!body) return [];
    return Array.from(
      body.querySelectorAll('.chart-row.is-data[data-row-type="data"]')
    );
  },
  getTemplateRow() {
    // On clone toujours une vraie row existante (modèle)
    return this.getDataRows()[0] || null;
  },

  // ---- Helpers data
  getRespondentColIds() {
    return State.respondents.map((r) => r.colId);
  },
  getNextRespondentColId() {
    const existing = this.getRespondentColIds();
    let i = 1;
    while (existing.includes(`r${i}`)) i++;
    return `r${i}`;
  },

  // ----------------------------
  // ROWS (ajout/suppression/reset)
  // ----------------------------
  createRowElementByCloning({ rowId }) {
    const templateRow = this.getTemplateRow();
    if (!templateRow) {
      console.warn("[ChartApp] No template row to clone. Create at least 1 row in Webflow.");
      return null;
    }

    // Clone profond (tout le HTML interne + classes)
    const newRow = templateRow.cloneNode(true);

    // Id unique
    newRow.setAttribute("data-row-id", rowId);

    // Reset champs (item + scores)
    this.resetRow(newRow);

    return newRow;
  },

  addRowToEnd() {
    const body = this.getBody();
    if (!body) return;

    const rowId = Utils.uid("row");
    const newRow = this.createRowElementByCloning({ rowId });
    if (!newRow) return;

    body.appendChild(newRow);
  },

  addRowAfter(existingRowEl) {
    const body = this.getBody();
    if (!body || !existingRowEl) return;

    const rowId = Utils.uid("row");
    const newRow = this.createRowElementByCloning({ rowId });
    if (!newRow) return;

    if (existingRowEl.nextSibling) {
      body.insertBefore(newRow, existingRowEl.nextSibling);
    } else {
      body.appendChild(newRow);
    }
  },

  deleteRow(rowEl) {
    const body = this.getBody();
    if (!body || !rowEl) return;

    const rows = this.getDataRows();
    if (rows.length <= 1) {
      this.resetRow(rowEl);
      return;
    }

    rowEl.remove();
  },

  resetRow(rowEl) {
    if (!rowEl) return;

    // item
    const itemInput = rowEl.querySelector('input[data-role="item"]');
    if (itemInput) itemInput.value = "";

    // scores
    rowEl.querySelectorAll('input[data-role="score"]').forEach((inp) => {
      inp.value = "0";
    });
  },

  resetTable() {
    this.getDataRows().forEach((r) => this.resetRow(r));
  },

  // ----------------------------
  // RESPONDENTS (colonnes) - CLONE
  // ----------------------------
  getTemplateRespondentHeaderCell() {
    // On clone une cellule respondent existante (dans le header)
    const headerRow = this.getHeaderRow();
    if (!headerRow) return null;

    // Prend la première cellule respondent existante (data-col)
    // (on évite le corner qui n'a pas data-col)
    return headerRow.querySelector('.chart-cell[data-col]') || null;
  },

  getTemplateScoreCell() {
    // On clone une cellule score existante (dans une row body)
    const templateRow = this.getTemplateRow();
    if (!templateRow) return null;

    // Prend une cellule score existante (data-col)
    return templateRow.querySelector('.chart-cell[data-col]') || null;
  },

  addRespondent() {
    const headerRow = this.getHeaderRow();
    const body = this.getBody();
    if (!headerRow || !body) return;

    const colId = this.getNextRespondentColId();

    const headerTemplate = this.getTemplateRespondentHeaderCell();
    const scoreTemplate = this.getTemplateScoreCell();

    if (!headerTemplate || !scoreTemplate) {
      console.warn("[ChartApp] Missing template cells to clone. Need at least 1 respondent column (r1) in header and body.");
      return;
    }

    // 1) Header cell (clone)
    const newHeaderCell = headerTemplate.cloneNode(true);
    newHeaderCell.setAttribute("data-col", colId);

    // Reset name/color pour ne pas dupliquer les valeurs
    const nameInput = newHeaderCell.querySelector('input[data-role="respondent"]');
    if (nameInput) nameInput.value = "";

    const colorInput = newHeaderCell.querySelector('input[data-role="respondent-color"]');
    if (colorInput) colorInput.value = "#000000";

    headerRow.appendChild(newHeaderCell);

    // 2) Score cells (clone) pour chaque row
    const rows = this.getDataRows();

    rows.forEach((rowEl) => {
      const newScoreCell = scoreTemplate.cloneNode(true);
      newScoreCell.setAttribute("data-col", colId);

      const scoreInput = newScoreCell.querySelector('input[data-role="score"]');
      if (scoreInput) scoreInput.value = "0";

      rowEl.appendChild(newScoreCell);
    });
  },

  deleteRespondent(colId) {
    if (!colId) return;

    const headerRow = this.getHeaderRow();
    const body = this.getBody();
    if (!headerRow || !body) return;

    // Empêcher de supprimer si c'est le dernier respondent (UX safe)
    const existing = this.getRespondentColIds();
    if (existing.length <= 1) return;

    // 1) Supprimer la cellule header correspondante
    const headerCell = headerRow.querySelector(`.chart-cell[data-col="${colId}"]`);
    if (headerCell) headerCell.remove();

    // 2) Supprimer toutes les cellules score correspondantes dans chaque row
    this.getDataRows().forEach((rowEl) => {
      const scoreCell = rowEl.querySelector(`.chart-cell[data-col="${colId}"]`);
      if (scoreCell) scoreCell.remove();
    });
  },
  
};

function getAutoChartHeightPx(itemCount, density = "standard") {
  let h = 420;

  if (itemCount <= 8) h = 420;
  else if (itemCount <= 14) h = 620;
  else if (itemCount <= 20) h = 820;
  else h = 1020;

  if (density === "expanded") h = Math.round(h * 1.2); // +20%
  return h;
}

// ----------------------------
  // Ajuster hauteur du chart
  // ---

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

  function applyGridColumns() {
    const count = State.respondents.length; // nb de répondants (r1..rN)

    // applique sur header + toutes les rows data
    const rows = DOM.table.querySelectorAll(".chart-row");
    rows.forEach((row) => {
      row.style.setProperty("--respondent-cols", String(count));
    });
  }
  
  
  const DrawingActions = {
    getContainer() {
      // Le parent qui contient toutes les param-row (à ajuster si tu as un wrapper dédié)
      return DOM.settingsPanel;
    },

    getRows() {
      return Array.from(
        DOM.settingsPanel.querySelectorAll(".param-row[data-drawing-id]")
      );
    },

    getTemplateRow() {
      return this.getRows()[0] || null;
    },

    getNextId() {
      const rows = this.getRows();
      let i = 1;
      const existing = rows.map((r) => r.getAttribute("data-drawing-id"));
      while (existing.includes(`drw${i}`)) i++;
      return `drw${i}`;
    },

    resetRow(rowEl) {
      // reset tous les inputs/selects de la row (simple)
      rowEl.querySelectorAll("input").forEach((inp) => {
        if (inp.type === "checkbox") inp.checked = false;
        else inp.value = "";
      });

      rowEl.querySelectorAll("select").forEach((sel) => {
        // default: garder la première option
        sel.selectedIndex = 0;
      });
    },

    addRow() {
      const container = this.getContainer();
      const template = this.getTemplateRow();
      if (!container || !template) {
        console.warn("[ChartApp] No drawing template row found (.param-row[data-drawing-id])");
        return;
      }

      const newRow = template.cloneNode(true);
      newRow.setAttribute("data-drawing-id", this.getNextId());
      this.resetRow(newRow);

      // Insère après la dernière row existante
      const rows = this.getRows();
      const last = rows[rows.length - 1];
      if (last && last.parentNode) {
        last.parentNode.insertBefore(newRow, last.nextSibling);
      } else {
        container.appendChild(newRow);
      }
    },

    deleteRow(btnEl) {
      const row = btnEl.closest('.param-row[data-drawing-id]');
      if (!row) return;

      const rows = this.getRows();
      if (rows.length <= 1) {
        // UX safe: on reset au lieu de supprimer la dernière
        this.resetRow(row);
        return;
      }

      row.remove();
    },
  };

  // ----------------------------
  // Export du graphique
  // ---
  
  const ExportActions = {
    exportChartPng() {
      // Récupère le chart à partir du canvas (robuste même si State est privé)
      const chart = Chart.getChart(DOM.canvas);
      if (!chart) {
        console.warn("[ChartApp] No chart instance found to export.");
        return;
      }

      // Option: fond blanc (sinon transparent)
      const canvas = chart.canvas;
      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;

      const ctx = tmp.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, tmp.width, tmp.height);
      ctx.drawImage(canvas, 0, 0);

      const url = tmp.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = url;
      a.download = `graphique-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
  };

  
    // ----------------------------
  //  Affichage des groupes lines/zones
  // ---


  function applyDrawingRowVisibility() {
    const rows = DOM.settingsPanel.querySelectorAll(".param-row[data-drawing-id]");
    rows.forEach((row) => {
      const typeSelect = row.querySelector('[data-setting="draw-type"]');
      const type = typeSelect ? typeSelect.value : "line";

      const zoneGroup = row.querySelector('[data-drawing-group="zone"]');
      const lineGroup = row.querySelector('[data-drawing-group="line"]');

      if (zoneGroup) zoneGroup.style.display = type === "zone" ? "" : "none";
      if (lineGroup) lineGroup.style.display = type === "line" ? "" : "none";
    });
  }

  // ----------------------------
  // Enregistrer le plugin d'annotations
  // ----------------------------

function registerAnnotationPlugin() {
  const plugins = Chart.registry?.plugins?.items;

  if (!plugins) {
    console.warn("[ChartApp] Chart registry not available.");
    return false;
  }

  // Si déjà enregistré, on ne fait rien
  if (plugins.annotation) return true;

  // Si le plugin existe globalement, on l'enregistre
  if (window.ChartAnnotation) {
    Chart.register(window.ChartAnnotation);
    return true;
  }
  



  console.warn("[ChartApp] Annotation plugin not found. Check script order/URL.");
  return false;
}

  // ----------------------------
  // État des boutons de type de graphiques
  // ----------------------------


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



  // ----------------------------
  // 7) Sync: relire DOM -> State puis render
  // ----------------------------
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
  // ----------------------------
  // 8) Events (live update + actions)
  // ----------------------------
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
  
    // ----------------------------
  // Navigation keyboard
  // ----------------------------
  
  const KeyboardNavigation = {
  init() {
    DOM.table.addEventListener("keydown", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;

      const isScore = target.matches('input[data-role="score"]');
      const isItem = target.matches('input[data-role="item"]');
      if (!isScore && !isItem) return;

      const key = e.key;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(key)) {
        e.preventDefault();
        this.move(target, key, e.shiftKey);
      }
    });
  },

  move(input, key, shift) {
    const row = input.closest('.chart-row.is-data[data-row-type="data"]');
    if (!row) return;

    const body = DOM.table.querySelector(".chart-table_body");
    const rows = Array.from(
      body.querySelectorAll('.chart-row.is-data[data-row-type="data"]')
    );

    const currentRowIndex = rows.indexOf(row);

    const cells = Array.from(row.querySelectorAll("input[data-role]"));
    const currentCellIndex = cells.indexOf(input);

    let nextRowIndex = currentRowIndex;
    let nextCellIndex = currentCellIndex;

    switch (key) {
      case "ArrowRight":
        nextCellIndex++;
        break;

      case "ArrowLeft":
        nextCellIndex--;
        break;

      case "ArrowDown":
        nextRowIndex++;
        break;

      case "ArrowUp":
        nextRowIndex--;
        break;

      case "Enter":
        nextRowIndex += shift ? -1 : 1;
        break;
    }

    const nextRow = rows[nextRowIndex];
    if (!nextRow) return;

    const nextInputs = Array.from(nextRow.querySelectorAll("input[data-role]"));
    const nextInput = nextInputs[nextCellIndex];

    if (nextInput) {
      nextInput.focus();
      nextInput.select?.();
    }
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

  const TemplateActions = {
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





