// src/app/state.js

export const State = {

  // data
  respondents: [],
  rows: [],
  drawings: [],

  // settings
  chartType: "bar-vertical",

  templateId: null, // ← ICI (avec les autres choix UI)

  scale: {
    auto: true,
    step: null,
    min: null,
    max: null,
  },

  text: {
    showLegend: true,
    showTitle: false,
    showX: true,
    showY: true,
    showValues: false,
    title: "",
  },

  colors: {
    enabled: false,
    scheme: "calm",
  },

  layout: {
    mode: "standard",
  },

  // runtime
  chart: null,

};