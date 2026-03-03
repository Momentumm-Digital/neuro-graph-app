
import { DOM } from "./dom.js"; 


export const DrawingActions = {
    getContainer() {
      // Le parent qui contient toutes les param-row (à ajuster si tu as un wrapper dédié)
      return DOM.settingsPanel;
    },

    getRows() {
      return Array.from(
        DOM.settingsPanel.querySelectorAll(".param-row[data-drawing-id]")
      );
    },

    getTemplateRow() {
      return this.getRows()[0] || null;
    },

    getNextId() {
      const rows = this.getRows();
      let i = 1;
      const existing = rows.map((r) => r.getAttribute("data-drawing-id"));
      while (existing.includes(`drw${i}`)) i++;
      return `drw${i}`;
    },

    resetRow(rowEl) {
      // reset tous les inputs/selects de la row (simple)
      rowEl.querySelectorAll("input").forEach((inp) => {
        if (inp.type === "checkbox") inp.checked = false;
        else inp.value = "";
      });

      rowEl.querySelectorAll("select").forEach((sel) => {
        // default: garder la première option
        sel.selectedIndex = 0;
      });
    },

    addRow() {
      const container = this.getContainer();
      const template = this.getTemplateRow();
      if (!container || !template) {
        console.warn("[ChartApp] No drawing template row found (.param-row[data-drawing-id])");
        return;
      }

      const newRow = template.cloneNode(true);
      newRow.setAttribute("data-drawing-id", this.getNextId());
      this.resetRow(newRow);

      // Insère après la dernière row existante
      const rows = this.getRows();
      const last = rows[rows.length - 1];
      if (last && last.parentNode) {
        last.parentNode.insertBefore(newRow, last.nextSibling);
      } else {
        container.appendChild(newRow);
      }
    },

    deleteRow(btnEl) {
      const row = btnEl.closest('.param-row[data-drawing-id]');
      if (!row) return;

      const rows = this.getRows();
      if (rows.length <= 1) {
        // UX safe: on reset au lieu de supprimer la dernière
        this.resetRow(row);
        return;
      }

      row.remove();
    },
  };