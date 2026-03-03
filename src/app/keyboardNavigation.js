import { DOM } from "./dom.js";

 export const KeyboardNavigation = {
  init() {
    DOM.table.addEventListener("keydown", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;

      const isScore = target.matches('input[data-role="score"]');
      const isItem = target.matches('input[data-role="item"]');
      if (!isScore && !isItem) return;

      const key = e.key;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(key)) {
        e.preventDefault();
        this.move(target, key, e.shiftKey);
      }
    });
  },

  move(input, key, shift) {
    const row = input.closest('.chart-row.is-data[data-row-type="data"]');
    if (!row) return;

    const body = DOM.table.querySelector(".chart-table_body");
    const rows = Array.from(
      body.querySelectorAll('.chart-row.is-data[data-row-type="data"]')
    );

    const currentRowIndex = rows.indexOf(row);

    const cells = Array.from(row.querySelectorAll("input[data-role]"));
    const currentCellIndex = cells.indexOf(input);

    let nextRowIndex = currentRowIndex;
    let nextCellIndex = currentCellIndex;

    switch (key) {
      case "ArrowRight":
        nextCellIndex++;
        break;

      case "ArrowLeft":
        nextCellIndex--;
        break;

      case "ArrowDown":
        nextRowIndex++;
        break;

      case "ArrowUp":
        nextRowIndex--;
        break;

      case "Enter":
        nextRowIndex += shift ? -1 : 1;
        break;
    }

    const nextRow = rows[nextRowIndex];
    if (!nextRow) return;

    const nextInputs = Array.from(nextRow.querySelectorAll("input[data-role]"));
    const nextInput = nextInputs[nextCellIndex];

    if (nextInput) {
      nextInput.focus();
      nextInput.select?.();
    }
  },
};