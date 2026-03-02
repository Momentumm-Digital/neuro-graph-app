
import { State } from "./state.js";
import { DOM } from "./dom.js";
import { Colors } from "./colors.js";
import { ChartMapper } from "./ChartMapper.js";




export const ChartRenderer = {
  render() {
    const ctx = DOM.canvas.getContext("2d");
    const data = ChartMapper.buildChartData();
    const { chartJsType, options } = ChartMapper.getChartJsTypeAndOptions();

    if (State.chart) {
      State.chart.destroy();
      State.chart = null;
    }

    State.chart = new Chart(ctx, {
      type: chartJsType,
      data,
      options,
    });

    // ✅ Thème: ré-appliquer après CHAQUE new Chart()
    if (State.colors?.enabled) {
      Colors.applyScheme(State.chart, State.colors.scheme, {
        fillAlpha: 0.18,
        borderWidth: 2,
        update: false, // <-- IMPORTANT
      });
    }

    // ✅ un seul update final
    State.chart.update();
  },
};
