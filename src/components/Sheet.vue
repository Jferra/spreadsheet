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
        <td
          v-for="col in sheet.x_size"
          :key="line + '-' + col"
          v-dbClick="{ dbclick: onCellDblClick, click: onCellClick, col, line, delay }"
        >
          <SheetCell
              @onCellBlur="onCellBlur"
              :cell="getCellAtIndex(col, line)"
              :col="col"
              :line="line"></SheetCell>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import dbclick from '../directives/DbClick';
import SheetHeaderCell from './SheetHeaderCell.vue';
import SheetCell from './SheetCell.vue';

export default {
  name: 'Sheet',
  components: {
    SheetHeaderCell,
    SheetCell,
  },
  directives: {
    dbClick: dbclick,
  },
  data: () => ({
    delay: 100,
  }),
  computed: {
    ...mapGetters(['getCellAtIndex']),
    ...mapState({
      sheet: state => state.sheet,
    }),
  },
  methods: {
    onCellClick(event, col, line) {
      const cell = this.getCellAtIndex(col, line);
      if (!event.ctrlKey) {
        this.$store.dispatch('clearSelection');
      }
      if (!cell || (cell && !cell.active)) {
        this.$store.dispatch('toggleCellSelection', { col, line });
      }
    },
    onCellDblClick(event, col, line) {
      this.$store.dispatch('toggleEditionMode', { col, line })
        .then(() => {
          this.$store.dispatch('clearSelection');
          event.target.focus();
        });
    },
    onCellBlur(content, col, line) {
      this.$store.dispatch('updateCell', { col, line, content });
      this.$store.dispatch('toggleEditionMode', { col, line });
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
  th, td {
    width: 80px;
    height: 25px;
  }
</style>
