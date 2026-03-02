import { Utils } from "./utils.js";

const SAULE_SCHEMES = {
  calm: ["#2F6B4F", "#3D8C6E", "#78C2A4", "#BFE9D7", "#E7F7F1"],
  contrast: ["#1F6F8B", "#155368", "#99C7D6", "#6FAFC3", "#E6F2F5"],
  neutral: ["#111827", "#374151", "#6B7280", "#9CA3AF", "#E5E7EB"],
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
