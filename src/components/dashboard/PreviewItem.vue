<template>
  <b-button :style="'background-color: ' + (item.configuration.color || colors.blue) + ';'" size="lg" class="previewItem btn-block">
    <b>{{ item.configuration.label }}</b>
    <div
      v-if="item.configuration.image_url && icons[item.configuration.image_url]"
      :style="'border-color: ' + (item.configuration.color || colors.blue) + '; color: ' + (item.configuration.color || colors.blue) + ';'"
      class="iconHolder"
      >
      <b-img :src="'/icons/' + icons[item.configuration.image_url]" />
    </div>
  </b-button>
</template>

<style lang="scss">
  .previewItem {
    position: relative;
    b {
      font-size: 1rem;
    }
    .iconHolder {
      position: absolute;
      width: 2.5rem;
      height: 2.5rem;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border-radius: 100%;
      border: 2px solid silver;
      padding: .25rem;
      font-size: 1.25rem;
      text-align: center;
      img {
        max-width: 1.25rem;
        height: 1.25rem;
      }
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
  data () {
    return {
      colors: colors,
      icons: icons
    }
  }
}
</script>
