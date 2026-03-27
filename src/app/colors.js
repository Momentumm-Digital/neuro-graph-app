import { Utils } from "./utils.js";

const SAULE_SCHEMES = {
  saule_naturel: ["#365857", "#6CA494", "#94A398", "#AFD0BB", "#D4E6CD"],
  saule_air: ["#6CA494", "#AFD0BB", "#D4E6CD", "#D9DFDB", "#74898C"],
  saule_brume: ["#063533", "#365857", "#74898C", "#94A398", "#D9DFDB"],
};

export const Colors = {
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
