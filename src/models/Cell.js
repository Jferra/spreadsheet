export default class Cell {
  constructor(selected, active, value) {
    this.selected = selected || false;
    this.active = active || false; // todo to rename
    this.value = value || '';
  }
}
