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
    height: 100%;
    border: 1px solid grey;
    cursor: pointer;

    &.selected {
      background: rgba(20, 100, 255, 0.67);
    }
  }
</style>
