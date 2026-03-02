import { DOM } from "./dom.js";
import { Utils } from "./utils.js";




export const Readers = {
    readRespondentsFromHeader() {
        // On lit les cellules du header qui ont data-col="r1", "r2"...
        const headerRow = DOM.table.querySelector(
            '.chart-row.is-header[data-row-type="head"]'
        );
        if (!headerRow) return [];

        const respondentCells = Utils.qsa(headerRow, '.chart-cell[data-col]');
        return respondentCells.map((cell) => {
            const colId = cell.getAttribute("data-col");

            const nameInput = cell.querySelector('input[data-role="respondent"]');
            const colorInput = cell.querySelector(
                'input[data-role="respondent-color"]'
            );

            return {
                colId,
                name: nameInput ? nameInput.value.trim() : colId,
                color: colorInput ? colorInput.value : "#000000",
            };
        });
    },

    readRowsFromBody(respondents) {
        const body = DOM.table.querySelector(".chart-table_body");
        if (!body) return [];

        const dataRows = Utils.qsa(
            body,
            '.chart-row.is-data[data-row-type="data"]'
        );

        return dataRows.map((rowEl) => {
            const id = rowEl.getAttribute("data-row-id") || Utils.uid("row");

            const itemInput = rowEl.querySelector('input[data-role="item"]');
            const item = itemInput ? itemInput.value.trim() : "";

            const scores = {};
            respondents.forEach((r) => {
                const scoreCell = rowEl.querySelector(`.chart-cell[data-col="${r.colId}"]`);
                const scoreInput = scoreCell ?
                    scoreCell.querySelector('input[data-role="score"]') :
                    null;

                // NOTE: si vide, on garde 0 (tu pourras changer la logique plus tard)
                const value = scoreInput ? Utils.toNumber(scoreInput.value, 0) : 0;
                scores[r.colId] = value;
            });

            return {
                id,
                item,
                scores
            };
        });
    },

    readSettings() {
        const panel = DOM.settingsPanel;

        // chart type: bouton actif via click (on le stocke dans State)
        // Ici on lit juste la value actuelle dans State, mais on peut aussi
        // détecter un bouton "active" si tu as une classe.
        const scaleAuto = panel.querySelector('[data-setting="scale-auto"]');
        const step = panel.querySelector('[data-setting="step"]');
        const min = panel.querySelector('[data-setting="scale-min"]');
        const max = panel.querySelector('[data-setting="scale-max"]');

        const showLegend = panel.querySelector('[data-setting="show-legend"]');
        const showTitle = panel.querySelector('[data-setting="show-title"]');
        const showX = panel.querySelector('[data-setting="show-x"]');
        const showY = panel.querySelector('[data-setting="show-y"]');
        const showValues = panel.querySelector('[data-setting="show-values"]');
        const colorsEnabled = panel.querySelector('[data-setting="colors-enabled"]');
        const colorScheme = panel.querySelector('[data-setting="color-scheme"]');
        const density = panel.querySelector('[data-setting="layout-density"]:checked');

        return {
            scale: {
                auto: scaleAuto ? !!scaleAuto.checked : true,
                step: step && step.value !== "" ? Utils.toNumber(step.value, null) : null,
                min: min && min.value !== "" ? Utils.toNumber(min.value, null) : null,
                max: max && max.value !== "" ? Utils.toNumber(max.value, null) : null,
            },
            text: {
                showLegend: showLegend ? !!showLegend.checked : true,
                showTitle: showTitle ? !!showTitle.checked : false,
                showX: showX ? !!showX.checked : true,
                showY: showY ? !!showY.checked : true,
                showValues: showValues ? !!showValues.checked : true,
            },
            colors: {
                enabled: colorsEnabled ? !!colorsEnabled.checked : false,
                scheme: colorScheme ? colorScheme.value : "calm",
            },
            layout: {
                density: density ? density.value : "standard",
            },
        };
    },


    readDrawings() {
        const rows = Array.from(
            DOM.settingsPanel.querySelectorAll(".param-row[data-drawing-id]")
        );

        return rows.map((row) => {
            const id = row.getAttribute("data-drawing-id");

            const type = row.querySelector('[data-setting="draw-type"]')?.value || "line";

            // champs zone
            const zoneMin = row.querySelector('[data-setting="zone-min"]')?.value ?? "";
            const zoneMax = row.querySelector('[data-setting="zone-max"]')?.value ?? "";

            // champs couleur pour lignes et zones
            const zoneColor =
                row.querySelector('[data-setting="zone-color"]')?.value || null;
            const lineColor =
                row.querySelector('[data-setting="line-color"]')?.value || null;


            // champs line
            const lineStyle = row.querySelector('[data-setting="line-style"]')?.value || "solid";
            const lineValue = row.querySelector('[data-setting="line-value"]')?.value ?? "";

            return {
                id,
                type,
                zone: {
                    min: zoneMin === "" ? null : Utils.toNumber(zoneMin, null),
                    max: zoneMax === "" ? null : Utils.toNumber(zoneMax, null),
                    color: zoneColor,
                },
                line: {
                    style: lineStyle,
                    value: lineValue === "" ? null : Utils.toNumber(lineValue, null),
                    color: lineColor,
                },
            };
        });
    },

};