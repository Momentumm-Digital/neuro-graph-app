import { State } from "./state.js";
import { DOM } from "./dom.js";
import { Utils } from "./utils.js";

export const TableActions = {
  // ----------------------------
  // Helpers DOM
  // ----------------------------
  getBody() {
    return DOM.table.querySelector(".chart-table_body");
  },
  getHeaderRow() {
    return DOM.table.querySelector('.chart-row.is-header[data-row-type="head"]');
  },
  getDataRows() {
    const body = this.getBody();
    if (!body) return [];
    return Array.from(
      body.querySelectorAll('.chart-row.is-data[data-row-type="data"]')
    );
  },
  getTemplateRow() {
    // On clone toujours une vraie row existante (modèle)
    return this.getDataRows()[0] || null;
  },

  // ---- Helpers data
  getRespondentColIds() {
    return State.respondents.map((r) => r.colId);
  },
  getNextRespondentColId() {
    const existing = this.getRespondentColIds();
    let i = 1;
    while (existing.includes(`r${i}`)) i++;
    return `r${i}`;
  },

  // ----------------------------
  // ROWS (ajout/suppression/reset)
  // ----------------------------
  createRowElementByCloning({ rowId }) {
    const templateRow = this.getTemplateRow();
    if (!templateRow) {
      console.warn("[ChartApp] No template row to clone. Create at least 1 row in Webflow.");
      return null;
    }

    // Clone profond (tout le HTML interne + classes)
    const newRow = templateRow.cloneNode(true);

    // Id unique
    newRow.setAttribute("data-row-id", rowId);

    // Reset champs (item + scores)
    this.resetRow(newRow);

    return newRow;
  },

  addRowToEnd() {
    const body = this.getBody();
    if (!body) return;

    const rowId = Utils.uid("row");
    const newRow = this.createRowElementByCloning({ rowId });
    if (!newRow) return;

    body.appendChild(newRow);
  },

  addRowAfter(existingRowEl) {
    const body = this.getBody();
    if (!body || !existingRowEl) return;

    const rowId = Utils.uid("row");
    const newRow = this.createRowElementByCloning({ rowId });
    if (!newRow) return;

    if (existingRowEl.nextSibling) {
      body.insertBefore(newRow, existingRowEl.nextSibling);
    } else {
      body.appendChild(newRow);
    }
  },

  deleteRow(rowEl) {
    const body = this.getBody();
    if (!body || !rowEl) return;

    const rows = this.getDataRows();
    if (rows.length <= 1) {
      this.resetRow(rowEl);
      return;
    }

    rowEl.remove();
  },

  resetRow(rowEl) {
    if (!rowEl) return;

    // item
    const itemInput = rowEl.querySelector('input[data-role="item"]');
    if (itemInput) itemInput.value = "";

    // scores
    rowEl.querySelectorAll('input[data-role="score"]').forEach((inp) => {
      inp.value = " ";
    });
  },

  resetTable() {
    this.getDataRows().forEach((r) => this.resetRow(r));
  },

  // ----------------------------
  // RESPONDENTS (colonnes) - CLONE
  // ----------------------------
  getTemplateRespondentHeaderCell() {
    // On clone une cellule respondent existante (dans le header)
    const headerRow = this.getHeaderRow();
    if (!headerRow) return null;

    // Prend la première cellule respondent existante (data-col)
    // (on évite le corner qui n'a pas data-col)
    return headerRow.querySelector('.chart-cell[data-col]') || null;
  },

  getTemplateScoreCell() {
    // On clone une cellule score existante (dans une row body)
    const templateRow = this.getTemplateRow();
    if (!templateRow) return null;

    // Prend une cellule score existante (data-col)
    return templateRow.querySelector('.chart-cell[data-col]') || null;
  },

  addRespondent() {
    const headerRow = this.getHeaderRow();
    const body = this.getBody();
    if (!headerRow || !body) return;

    const colId = this.getNextRespondentColId();

    const headerTemplate = this.getTemplateRespondentHeaderCell();
    const scoreTemplate = this.getTemplateScoreCell();

    if (!headerTemplate || !scoreTemplate) {
      console.warn("[ChartApp] Missing template cells to clone. Need at least 1 respondent column (r1) in header and body.");
      return;
    }

    // 1) Header cell (clone)
    const newHeaderCell = headerTemplate.cloneNode(true);
    newHeaderCell.setAttribute("data-col", colId);

    // Reset name/color pour ne pas dupliquer les valeurs
    const nameInput = newHeaderCell.querySelector('input[data-role="respondent"]');
    if (nameInput) nameInput.value = "";

    const colorInput = newHeaderCell.querySelector('input[data-role="respondent-color"]');
    if (colorInput) colorInput.value = "#000000";

    headerRow.appendChild(newHeaderCell);

    // 2) Score cells (clone) pour chaque row
    const rows = this.getDataRows();

    rows.forEach((rowEl) => {
      const newScoreCell = scoreTemplate.cloneNode(true);
      newScoreCell.setAttribute("data-col", colId);

      const scoreInput = newScoreCell.querySelector('input[data-role="score"]');
      if (scoreInput) scoreInput.value = " ";

      rowEl.appendChild(newScoreCell);
    });
  },

  deleteRespondent(colId) {
    if (!colId) return;

    const headerRow = this.getHeaderRow();
    const body = this.getBody();
    if (!headerRow || !body) return;

    // Empêcher de supprimer si c'est le dernier respondent (UX safe)
    const existing = this.getRespondentColIds();
    if (existing.length <= 1) return;

    // 1) Supprimer la cellule header correspondante
    const headerCell = headerRow.querySelector(`.chart-cell[data-col="${colId}"]`);
    if (headerCell) headerCell.remove();

    // 2) Supprimer toutes les cellules score correspondantes dans chaque row
    this.getDataRows().forEach((rowEl) => {
      const scoreCell = rowEl.querySelector(`.chart-cell[data-col="${colId}"]`);
      if (scoreCell) scoreCell.remove();
    });
  },
  
};
