<template>
  <div id="drawer" class="p-3">
    <span v-for="button in items" v-bind:key="button.id">
      <EditorPreviewButton :button="button" class="m-2" />
    </span>
  </div>
</template>

<style>
  #drawer {
    background: white;
    border: 1px solid #002957;
  }
</style>

<script>
  
import EditorPreviewButton from '@/components/dashboard/EditorPreviewButton'

export default {
  name: 'EditorPreviewDrawer',
  components: {
    EditorPreviewButton
  },
  props: {
    items: Array
  }
}
</script>