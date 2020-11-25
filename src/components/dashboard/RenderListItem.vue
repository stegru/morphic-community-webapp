<template>
  <span :style="'color: ' + (item.configuration.color || colors.blue) + ';'" class="listItem">
    <b-img v-if="item.configuration.image_url && icons[item.configuration.image_url]" :src="'/icons/' + icons[item.configuration.image_url]" />
    <b-icon v-else icon="bootstrap"></b-icon>
    {{ item.configuration.label }}
  </span>
</template>

<style lang="scss">
  .listItem {
    img {
      max-width: 1rem;
      height: 1rem;
    }
  }
</style>

<script>

import { colors, icons } from "@/utils/constants";

export default {
    name: "RenderListItem",
    props: {
        item: Object
    },
    data() {
        return {
            colors: colors,
            icons: icons
        };
    }
};
</script>
