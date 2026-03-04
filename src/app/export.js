import { DOM } from "./dom.js";

export const ExportActions = {
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
