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
    getCellAtIndex: state => (col, line) => {
      const x = col - 1;
      const y = line - 1;
      const index = (y * state.sheet.x_size) + x;
      return state.sheet.data[index];
    },
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

      // Need to start to 0 for index
      const x = col - 1;
      const y = line - 1;
      const index = (y * state.sheet.x_size) + x;
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
