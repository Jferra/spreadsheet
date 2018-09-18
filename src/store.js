import Vue from 'vue';
import Vuex from 'vuex';

import Cell from './models/Cell';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sheet: {
      x_size: 5, // todo put in conf file
      y_size: 5, // todo put in conf file
      data: [],
    },
  },
  getters: {
    getCellAtIndex: (state, getters) => (col, line) => {
      return state.sheet.data[getters.getIndex(col, line)];
    },
    getIndex: state => (col, line) => {
      // Need to start to 0 for index
      const x = col - 1;
      const y = line - 1;
      return (y * state.sheet.x_size) + x;
    },
  },
  mutations: {
    addColumn(state, count) {
      state.sheet.x_size += count;
    },
    addLine(state, count) {
      state.sheet.y_size += count;
    },
    updateCell(state, { getIndex, col, line, content }) {
      const cell = state.sheet.data[getIndex(col, line)] || new Cell();

      Vue.set(state.sheet.data, getIndex(col, line), {
        ...cell,
        value: content,
      });
    },
    emptyCell(state, { getIndex, col, line }) {
      const cell = state.sheet.data[getIndex(col, line)] || new Cell();

      Vue.set(state.sheet.data, getIndex(col, line), {
        ...cell,
        value: null,
      });
    },
    emptySelectedCells(state) {
      state.sheet.data = state.sheet.data.map((cell) => {
        const newCell = cell;
        if (cell.selected && (cell.value != null && cell.value.length > 0)) {
          newCell.value = '';
        }
        return newCell;
      });
    },
    toggleEditionMode(state, { getIndex, col, line }) {
      const cell = state.sheet.data[getIndex(col, line)] || new Cell();
      Vue.set(state.sheet.data, getIndex(col, line), {
        ...cell,
        active: !cell.active,
      });
    },
    clearSelection(state) {
      state.sheet.data = state.sheet.data.map((cell) => {
        const newCell = cell;
        if (cell.selected) newCell.selected = !cell.selected;
        return newCell;
      });
    },
    toggleCellSelection(state, { getIndex, col, line }) {
      const cell = state.sheet.data[getIndex(col, line)] || new Cell();
      Vue.set(state.sheet.data, getIndex(col, line), {
        ...cell,
        selected: !cell.selected,
      });
    },
  },
  actions: {
    addColumn(context, count) {
      context.commit('addColumn', count);
    },
    addLine(context, count) {
      context.commit('addLine', count);
    },
    updateCell(context, { col, line, content }) {
      context.commit('updateCell', {
        getIndex: context.getters.getIndex, col, line, content,
      });
    },
    emptyCell(context, { col, line }) {
      context.commit('emptyCell', { getIndex: context.getters.getIndex, col, line });
    },
    emptySelectedCells(context) {
      context.commit('emptySelectedCells');
    },
    toggleEditionMode(context, { col, line }) {
      context.commit('toggleEditionMode', { getIndex: context.getters.getIndex, col, line });
    },
    clearSelection(context) {
      context.commit('clearSelection');
    },
    toggleCellSelection(context, { col, line }) {
      context.commit('toggleCellSelection', { getIndex: context.getters.getIndex, col, line });
    },
  },
});
