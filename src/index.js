import { init } from "./app/init.js";

window.Webflow ||= [];
window.Webflow.push(() => {
  init();
});