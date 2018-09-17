<template functional>
  <td
      @click="listeners.click"
      :class="{'selected': props.cell && props.cell.selected}"
  >
    {{props.cell && props.cell.selected ? 'S' : 'U'}}
    {{ props.cell ? props.cell.value : '' }}
  </td>
</template>

<script>
export default {
  name: 'SheetCell',
  props: {
    cell: {
      default: null,
      validate: value =>
        value === null
        || (typeof value.value === 'string' && typeof value.selected === 'boolean'),
    },
  },
};
</script>

<style scoped lang="scss">
  td {
    border: 1px solid black;
    cursor: pointer;
    width: 80px;

    &.selected { background: lightblue; }
  }
</style>
