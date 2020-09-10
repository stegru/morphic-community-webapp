<template>
  <button v-if="item.configuration && item.configuration.visual && item.configuration.visual.type == 'multiButton'" class="previewItem multiButton">
    <label>{{item.configuration.label}}</label>
    <div class="buttons" >
      <button v-for="(button, index) in item.configuration.visual.buttons" v-bind:key="index"
              :style="'background: '+colors.default_button"
              v-bind:class="{ 'extraBig': item.configuration.visual.extraBig}">
        {{button}}
      </button>
    </div>
  </button>
  <button v-else class="previewItem standardButton btn-block">
    <div
      v-if="item.configuration.image_url && icons[item.configuration.image_url]"
      :style="'border-color: ' + (item.configuration.color || colors.default_button) + '; color: ' + (item.configuration.color || colors.default_button) + ';'"
      class="iconHolder"
      >
      <b-img :src="'/icons/' + icons[item.configuration.image_url]" />
    </div>
    <b :style="'background-color: ' + (item.configuration.color || colors.default_button) + ';'" v-bind:class="{ withImage: item.configuration.image_url && icons[item.configuration.image_url]}">{{ item.configuration.label}}</b>
  </button>
</template>

<style lang="scss">
  .previewItem {
    position: relative;
    width: 100px;
    background: none;
    border: none;
    color: white;
    padding: 0px;
    font-size: 14px;
    width: 100px;

    &.standardButton {
      b {
        padding: 10px;
        border-radius: 10px;
        display: block;

        &.withImage {
          padding-top: calc(66px/3);
        }
      }

      .iconHolder {
        width: 66px;
        height: 66px;
        margin-bottom: calc(-66px/3);
        margin-left: auto;
        margin-right: auto;
        background: white;
        border-radius: 100%;
        border: 2px solid silver;
        z-index: 10;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: calc(64px*0.6);
          width: calc(64px*0.6);
        }
      }
    }

    &.multiButton {
      label {
        color: black;
        margin-bottom: 3px;
      }

      .buttons {
        display: flex;

        button:not(:last-child) {
          margin-right: 5px;
        }

        button {
          border: none;
          flex-grow: 1;
          padding: 5px !important;
          color: white;
          font-weight: bold;

          &.extraBig {
            font-size: 18px;
            line-height: 16px;
          }
        }
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
