// src/app/utils.js

export const Utils = {
  uid(prefix = "row") {
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