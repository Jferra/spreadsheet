<template>
  <div id="app">
    <Sheet :sheet="sheet"/>
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
};
</script>

<style lang="scss">

</style>
