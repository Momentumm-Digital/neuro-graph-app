// src/app/state.js
export const State = {
    
        // data
        respondents: [], // [{ colId:"r1", name:"", color:"#000000" }, ...]
        rows: [], // [{ id:"row-xxx", item:"", scores:{ r1:12, r2:34 } }, ...]
            drawings: [],
    
        // settings
        chartType: "bar-vertical", // "bar-vertical" | "bar-horizontal" | "line"
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
        },
         colors: {
          enabled: false,     // ✅ par défaut: on garde tes color pickers actuels
          scheme: "calm",     // "calm" | "contrast" | "neutral"
        },
    
        // runtime
        chart: null,

};