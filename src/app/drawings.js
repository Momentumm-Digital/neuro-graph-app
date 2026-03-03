// src/app/drawings.js
import { DOM } from "./dom.js";

export function applyDrawingRowVisibility() {
  const rows = DOM.settingsPanel?.querySelectorAll(
    ".param-row[data-drawing-id]"
  );

  if (!rows) return;

  rows.forEach((row) => {
    const typeSelect = row.querySelector('[data-setting="draw-type"]');
    const type = typeSelect ? typeSelect.value : "line";

    const zoneGroup = row.querySelector('[data-drawing-group="zone"]');
    const lineGroup = row.querySelector('[data-drawing-group="line"]');

    if (zoneGroup) zoneGroup.style.display = type === "zone" ? "" : "none";
    if (lineGroup) lineGroup.style.display = type === "line" ? "" : "none";
  });
}