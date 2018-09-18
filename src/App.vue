<template>
  <div id="app">
    <Sheet/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Sheet from './components/Sheet.vue';

export default {
  name: 'app',
  components: {
    Sheet,
  },
  computed: mapState({
    sheet: state => state.sheet,
  }),
  mounted() {
    document.addEventListener('keyup', (event) => {
      // console.log('keypup', event.keyCode);
      if (event.keyCode === 46 || event.keyCode === 8) {
        this.emptySelectedCells();
      }
    });
  },
  methods: {
    emptySelectedCells() {
      this.$store.dispatch('emptySelectedCells');
    },
  },
};
</script>

<style lang="scss">

</style>
