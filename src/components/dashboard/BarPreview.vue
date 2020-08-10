<template>
  <div class="barPreview pl-3 pt-3 pr-3 pb-0">
    <div v-if="bar.items.length > 0">
      <div v-for="item in bar.items" :key="item.configuration.label">
        <PreviewItem v-if="item.is_primary" :item="item" class="mb-3" />
      </div>
    </div>
    <div v-else>
      <p class="text-center mt-5 mb-5">
        This bar has no buttons at the moment, click on the <b-link :to="'/dashboard/morphicbar-editor/' + bar.id"><b>Customize</b></b-link> button to add some.
      </p>
    </div>
    <div class="logoHolder text-center mt-5 m-3">
      <b-img src="/img/logo-color.svg" />
    </div>
  </div>
</template>

<style>
  .barPreview {
    background: white;
    border: 1px solid #002957;
  }
  .barPreview button {
    cursor: default !important;
    line-height: 100%;
    height: 5rem;
  }
</style>

<script>
import PreviewItem from '@/components/dashboard/PreviewItem'

export default {
  name: 'BarPreview',
  props: {
    bar: Object
  },
  components: {
    PreviewItem
  }
}
</script>
