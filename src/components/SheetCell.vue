<template functional>
  <div
      :class="{'selected': props.cell && props.cell.selected}"
  >
    {{ props.cell ? props.cell.value : '' }}
  </div>
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
  div {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    cursor: pointer;

    &.selected { background: lightblue; }
  }
</style>
