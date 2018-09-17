export default {

  bind(el, { value }) {
    let timer;
    let prevent = false;
    const delay = value.delay || 300;

    el.addEventListener('click', () => {
      timer = setTimeout(() => {
        if (prevent === false) {
          value.click(value.col, value.line);
        }
        prevent = false;
      }, delay);
    });

    el.addEventListener('dblclick', () => {
      clearTimeout(timer);
      prevent = true;
      value.dbclick();
    });
  },

};

/* import Vue from 'vue';

const dbclick = ({ click, dbclick, delay = 300 }) => (WrappedComponent) => {
  console.log(WrappedComponent)
  return Vue.component('my-component', {
    functional: true,
    render(createElement, context) {
      const { data } = context;
      return createElement(WrappedComponent, data, context.children);
    },
  });
};

export default dbclick; */
