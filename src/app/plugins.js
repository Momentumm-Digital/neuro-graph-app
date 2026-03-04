// src/app/layout.js


export function registerAnnotationPlugin() {
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