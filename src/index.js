"use strict";

window.Webflow ||= [];
window.Webflow.push(async () => {
    console.log("🚀 Graph App ready (Webflow loaded)");
    console.log("🚀 Utils loaded");
    console.log("🚀 State loaded");
    console.log("🚀 DOM loaded");
    console.log("🚀 colors loaded");
    console.log("🚀 readers loaded");
    console.log("🚀 chartMapper loaded");
    console.log("🚀 chartRenderer loaded");
    console.log("🚀 grid loaded");
    console.log("🚀 export loaded");
    console.log("🚀 template loaded");
    console.log("🚀 plugins loaded");
    console.log("🚀 table actions loaded");
    console.log("🚀 drawing actions loaded");
    console.log("🚀 keyboard nav loaded");

  try {
    await import("./legacy-v3.js");
    console.log("✅ legacy-v3 loaded");
  } catch (err) {
    console.error("❌ legacy-v3 failed to load", err);
  }
});