<template>
  <div class="sheet">
    <table>
      <tr>
        <th scope="col"></th>
        <SheetHeaderCell v-for="col in sheet.x_size"
                         :key="col"
                         :content="col.toString()"
                         @click="colClick(col)"/>
      </tr>
      <tr
          v-for="line in sheet.y_size"
          :key="line"
      >
        <SheetHeaderCell @click="lineClick(line)" :content="line.toString()"/>
        <SheetCell v-for="col in sheet.x_size"
                   :cell="getCellAtIndex(col, line)"
                   :key="line + '-' + col"
                   @click="onCellClick(col, line)"
        ></SheetCell>

      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SheetHeaderCell from './SheetHeaderCell.vue';
import SheetCell from './SheetCell.vue';

export default {
  name: 'Sheet',
  components: {
    SheetHeaderCell,
    SheetCell,
  },
  data: () => ({
    sheet: {
      x_size: 5,
      y_size: 5,
      data: [],
    },
  }),
  computed: {
    ...mapGetters(['getCellAtIndex']),
  },
  methods: {
    onCellClick(col, line) {
      this.$store.dispatch('toggleCellSelection', { col, line });
    },
    colClick(col) {
      console.log('colClick', col);
      // this.$store.dispatch('', col);
    },
    lineClick(line) {
      console.log('lineClick', line);
      // this.$store.dispatch('', line);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
