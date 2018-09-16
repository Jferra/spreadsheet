import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sheet: {
      x_size: 50, // todo put in conf file
      y_size: 50, // todo put in conf file
      data: [],
    },
  },
  mutations: {
    addColumn(state, count) {
      state.sheet.x_size += count;
    },
    addLine(state, count) {
      state.sheet.y_size += count;
    },
    updateCell(state, x, y, content) {
      const index = state.sheet.data.findIndex(cell => cell.x === x && cell.y === y);
      if (index !== -1) state.sheet.data[index].value = content;
    },
    emptyCell(state, x, y) {
      const index = state.sheet.data.findIndex(cell => cell.x === x && cell.y === y);
      if (index !== -1) state.sheet.data[index].value = '';
    },
    toggleCellSelection(state, x, y) {
      const index = state.sheet.data.findIndex(cell => cell.x === x && cell.y === y);
      if (index !== -1) state.sheet.data[index].isSelected = !state.sheet.data[index].isSelected;
    },
  },
  actions: {
    addColumn(context, count) {
      context.commit('addColumn', count);
    },
    addLine(context, count) {
      context.commit('addLine', count);
    },
    updateCell(context, x, y, content) {
      context.commit('updateCell', x, y, content);
    },
    emptyCell(context, x, y) {
      context.commit('emptyCell', x, y);
    },
    toggleCellSelection(context, x, y) {
      context.commit('toggleCellSelection', x, y);
    },
  },
});
