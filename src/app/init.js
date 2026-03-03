// src/app/init.js
import { KeyboardNavigation } from "./keyboardNavigation.js";
import { UI } from "./ui.js";
import { registerAnnotationPlugin } from "./plugins.js";
import { syncAndRender } from "./sync.js";
import { Events } from "./events.js";

export function init() {
  // Chart.js plugins (CDN globals)
  if (window.ChartDataLabels) Chart.register(ChartDataLabels);

  KeyboardNavigation.init();
  UI.syncChartTypeButtonsUI();
  registerAnnotationPlugin();
  syncAndRender();
  Events.init();
}