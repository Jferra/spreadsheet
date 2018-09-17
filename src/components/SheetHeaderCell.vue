<template functional>
  <th :scope="props.scope" @click="listeners.click">{{ props.content }}</th>
</template>

<script>
export default {
  name: 'SheetHeaderCell',
  props: {
    content: {
      default: null,
      validate: value =>
        value === null
        || (typeof value === 'string'),
    },
    scope: {
      default: null,
      validate: value =>
        value === null
        || (typeof value === 'string'),
    },
  },
};
</script>

<style scoped lang="scss">
  th {
    border: 1px solid black;
    cursor: pointer;

    &.selected { background: lightgreen; }
  }
</style>
