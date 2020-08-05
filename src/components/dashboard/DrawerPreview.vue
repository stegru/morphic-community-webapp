<template>
  <div class="barPreview pl-3 pt-3 pr-3 pb-0">
    <b-row v-if="drawerItems.length > 0">
      <b-col md="6">
        <div v-for="(item, index) in drawerItems" :key="item.configuration.label">
          <div v-if="index < preview.drawer.h" class="previewHolder mb-3">
            <PreviewItem :item="item" />
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <div v-for="(item, index) in drawerItems" :key="item.configuration.label">
          <div v-if="index >= preview.drawer.h" class="previewHolder mb-3">
            <PreviewItem :item="item" />
          </div>
        </div>
      </b-col>
    </b-row>
    <div v-else>
      <p class="text-center mt-5 mb-5">
        This bar has no buttons at the moment, click on the <b-link :to="'/dashboard/morphicbar-editor/' + bar.id"><b>Customize</b></b-link> button to add some.
      </p>
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
  },
  computed: {
    drawerItems: function () {
      const data = []
      if (this.bar.items && this.bar.items.length > 0) {
        for (let i = 0; i < this.bar.items.length; i++) {
          if (this.bar.items[i].is_primary === false) {
            data.push(this.bar.items[i])
          }
        }
      }
      return data
    }
  },
  data() {
    return {
      // configurations
      preview: {
        drawer: {
          w: 2,
          h: 5
        }
      }
    }
  }
}
</script>
