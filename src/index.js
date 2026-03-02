"use strict";

window.Webflow ||= [];
window.Webflow.push(async () => {
    console.log("🚀 Graph App ready (Webflow loaded)");
    console.log("🚀 Utils loaded");
    console.log("🚀 State loaded");

  try {
    await import("./legacy-v3.js");
    console.log("✅ legacy-v3 loaded");
  } catch (err) {
    console.error("❌ legacy-v3 failed to load", err);
  }
});