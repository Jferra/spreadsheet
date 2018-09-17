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
                   :cell="getAtCell(line, col)"
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
    ...mapGetters(['getAtIndex']),
    sheetLength() {
      return this.sheet.x_size * this.sheet.y_size;
    },
  },
  methods: {
    onCellClick(col, line) {
      // Need to start to 0 for index
      const x = col - 1;
      const y = line - 1;
      const index = (y * this.sheet.x_size) + x;
      const cell = this.sheet.data[index] || {
        selected: false,
        value: '',
      };
      this.$set(this.sheet.data, index, {
        ...cell,
        selected: !cell.selected,
      });
    },
    colClick(col) {
      console.log('colClick', col);
      // this.$store.dispatch('', col);
    },
    lineClick(line) {
      console.log('lineClick', line);
      // this.$store.dispatch('', line);
    },
    getAtCell(line, col) {
      const x = col - 1;
      const y = line - 1;
      const index = (y * this.sheet.x_size) + x;
      return this.sheet.data[index];
    },
  },
};
</script>

<style scoped lang="scss">

</style>
