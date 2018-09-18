<template functional>
  <input
      @blur="listeners['onCellBlur']($event.target.value, props.col, props.line)"
      type="text"
      :class="{'selected': props.cell && props.cell.selected}"
      :value="props.cell && props.cell.value"
      :disabled="!props.cell || !props.cell.active"
  />
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
    col: {
      default: null,
      validate: value => value === null || (typeof value === 'number'),
    },
    line: {
      default: null,
      validate: value => value === null || (typeof value === 'number'),
    },
  },
};
</script>

<style scoped lang="scss">
  input {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    cursor: pointer;

    &.selected { background: lightblue; }
  }
</style>
