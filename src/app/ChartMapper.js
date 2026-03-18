// src/app/chartMapper.js
import { Utils } from "./utils.js";   // seulement si ChartMapper utilise Utils
import { State } from "./state.js";   // seulement si ChartMapper lit State directement



export const ChartMapper = {
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
      backgroundColor: Utils.hexToRgba(resp.color, 0.95) || resp.color,
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
              drawTime: "beforeDatasetsDraw",
            }
          : {
              type: "box",
              xMin: d.zone.min,
              xMax: d.zone.max,
              backgroundColor: color,
              borderWidth: 0,
              drawTime: "beforeDatasetsDraw",
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