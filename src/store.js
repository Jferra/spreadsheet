import Vue from 'vue';
import Vuex from 'vuex';

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
    getAtIndex: (state, getters) => (ln, col) => state.sheet.data[(ln * getters.sheetSize) + col],
    sheetSize: state => state.sheet.x_size * state.sheet.y_size,
  },
  mutations: {
    addColumn(state, count) {
      state.sheet.x_size += count;
    },
    addLine(state, count) {
      state.sheet.y_size += count;
    },
    updateCell(state, { col, line, content }) {
      if (state.sheet.data[col] === undefined) state.sheet.data[col] = {};
      if (state.sheet.data[col][line] === undefined) state.sheet.data[col][line] = {};
      state.sheet.data[col][line].value = content;
    },
    emptyCell(state, { col, line }) {
      if (state.sheet.data[col] === undefined) state.sheet.data[col] = {};
      if (state.sheet.data[col][line] === undefined) state.sheet.data[col][line] = {};
      state.sheet.data[col][line].value = '';
    },
    toggleCellSelection(state, { col, line }) {
      console.log(col, line);

      const sheetLength = state.sheet.x_size * state.sheet.y_size;
      const index = (line * sheetLength) + col;
      console.log(sheetLength, index);
      const cell = state.sheet.data[index] || {
        selected: false,
        value: '',
      };
      Vue.set(state.sheet.data, index, {
        ...cell,
        selected: !cell.selected,
      });

      console.log('toggleCellSelection', state);
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
      context.commit('updateCell', { col, line, content });
    },
    emptyCell(context, { col, line }) {
      context.commit('emptyCell', { col, line });
    },
    toggleCellSelection(context, { col, line }) {
      console.log('action ', col, line);
      context.commit('toggleCellSelection', { col, line });
    },
  },
});
