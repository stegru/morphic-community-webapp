<template>
  <b-button variant="primary" size="lg" class="btn-block">
    <b>{{ item.configuration.label }}</b>
  </b-button>
</template>

<script>

export default {
  name: 'PreviewItem',
  props: {
    item: Object
  }
}
</script>
