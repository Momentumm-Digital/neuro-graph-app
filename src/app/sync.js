// src/app/sync.js

import { State } from "./state.js";
import { Readers } from "./readers.js";
import { ChartRenderer } from "./chartRenderer.js";
import { UI } from "./ui.js";
import { applyDrawingRowVisibility } from "./drawings.js";
import { applyGridColumns } from "./grid.js";
import { Layout } from "./layout.js";
import { DOM } from "./dom.js";

export function syncAndRender() {
  State.respondents = Readers.readRespondentsFromHeader();
  State.rows = Readers.readRowsFromBody(State.respondents);
  State.drawings = Readers.readDrawings();

  const settings = Readers.readSettings();
  console.log("settings.layout", settings.layout);
  console.log(
  "checked radio",
  document.querySelector('[data-setting="layout-density"]:checked')?.value
  );
  State.scale = settings.scale;
  State.text = settings.text;

  if (settings.colors && typeof settings.colors === "object") {
    State.colors = settings.colors;
  }

  if (DOM.chartTitle) {
  DOM.chartTitle.textContent = State.text.title || "Résultats";
  DOM.chartTitle.style.display = State.text.showTitle ? "" : "none";
}

  State.layout = settings.layout || State.layout || { mode: "standard" };

  Layout.applyChartLayoutMode();

  UI.toggleRespondentPickersDisabled(State.colors?.enabled);
  UI.syncAllColorPickers();
  UI.syncRespondentColorPickers();


  applyDrawingRowVisibility();
  applyGridColumns();

  ChartRenderer.render();
}