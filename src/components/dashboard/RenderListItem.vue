<template>
  <span>
    <span v-if="item.kind === 'link'"><b-icon-link></b-icon-link></span>
    <span v-else-if="item.kind === 'application'"><b-icon-app></b-icon-app></span>
    <span v-else><b-icon-controller></b-icon-controller></span>
    <span style="color: navy;">
      {{ item.label }}
    </span>
  </span>
</template>

<script>

export default {
  name: 'RenderListItem',
  props: {
    item: Object
  }
}
</script>
