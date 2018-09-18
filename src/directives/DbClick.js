export default {

  bind(el, { value }) {
    let timer;
    let prevent = false;
    const delay = value.delay || 300;

    el.addEventListener('click', (event) => {
      timer = setTimeout(() => {
        if (prevent === false) {
          value.click(event, value.col, value.line);
        }
        prevent = false;
      }, delay);
    });

    el.addEventListener('dblclick', (event) => {
      clearTimeout(timer);
      prevent = true;
      value.dbclick(event, value.col, value.line);
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
