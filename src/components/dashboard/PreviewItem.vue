<template>
  <b-button :style="'background-color: ' + (item.configuration.color || colors.blue) + ';'" size="lg" class="previewItem btn-block">
    <b>{{ item.configuration.label }}</b>
    <div
      v-if="item.configuration.image_url"
      :style="'border-color: ' + (item.configuration.color || colors.blue) + '; color: ' + (item.configuration.color || colors.blue) + ';'"
      class="iconHolder"
      >
      <b-icon :icon="item.configuration.image_url"></b-icon>
    </div>
  </b-button>
</template>

<style lang="scss">
  .previewItem {
    position: relative;
    .iconHolder {
      position: absolute;
      top: -1.5rem;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border-radius: 100%;
      border: 2px solid silver;
      padding: .5rem;
      font-size: 1.5rem;
    }
  }
</style>

<script>

import { colors, icons } from '@/utils/constants'

export default {
  name: 'PreviewItem',
  props: {
    item: Object
  },
  data() {
    return {
      colors: colors,
      icons: icons
    }
  }
}
</script>
