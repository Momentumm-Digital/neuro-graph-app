// src/app/sync.js
import { State } from "./state.js";
import { Readers } from "./readers.js";
import { ChartRenderer } from "./chartRenderer.js";
import { Layout } from "./layout.js";

export function syncAndRender() {
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

  // ✅ remplacé par Layout
  Layout.applyChartAutoHeight();

  // ⚠️ Ces 3 fonctions restent TEMP dans legacy (pour l’instant)
  toggleRespondentPickersDisabled(State.colors?.enabled);
  applyDrawingRowVisibility();
  applyGridColumns();

  ChartRenderer.render();
}