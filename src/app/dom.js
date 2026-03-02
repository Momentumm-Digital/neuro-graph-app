// src/app/dom.js
export const DOM = {
  get table() {
    return document.querySelector(".chart-table");
  },
  get settingsPanel() {
    return document.querySelector('[data-ui="settings-panel"]');
  },
  get canvas() {
    return document.querySelector("#chart-canvas");
  },
};