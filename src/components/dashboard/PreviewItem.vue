<template>
  <!-- Simplified button (no text and small size) -->
  <button v-if="simplified" class="previewItem simplified" @click="addToBar(item, $event)">
    <div v-if="item.configuration.visual && item.configuration.visual.type == 'multiButton'" class="multiButton" :style="'background: '+colors.default_button">
      multiButton
    </div>
    <div v-else-if="noImage" class="noImage" :style="'background: '+colors.default_button">
    </div>
    <div v-else class="regular" :style="'background: '+colors.default_button">
      <div class="imageContainer" :style="'border-color: '+colors.default_button">
        <b-img :src="'/icons/' + icons[item.configuration.image_url]"/>
      </div>
    </div>
  </button>

  <!-- Multibutton rendering -->
  <button v-else-if="item.configuration && item.configuration.visual && item.configuration.visual.type == 'multiButton'" class="previewItem multiButton">
    <label>{{item.configuration.label}}</label>
    <div class="buttons" >
      <button v-for="(button, index) in item.configuration.visual.buttons" v-bind:key="index"
              :style="'background: '+colors.default_button" @click="addToBar(item, $event)"
              v-bind:class="{ 'extraBig': item.configuration.visual.extraBig}">
        {{button}}
      </button>
    </div>
  </button>

  <!-- Normal button with/without image -->
  <button v-else class="previewItem standardButton" @click="addToBar(item, $event)">
    <div
      v-if="item.configuration.image_url && icons[item.configuration.image_url] && !noImage"
      :style="'border-color: ' + (item.configuration.color || colors.default_button) + '; color: ' + (item.configuration.color || colors.default_button) + ';'"
      class="iconHolder">
      <b-img :src="'/icons/' + icons[item.configuration.image_url]" />
    </div>
    <b :style="'background-color: ' + (item.configuration.color || colors.default_button) + ';'" v-bind:class="{ withImage: !noImage && item.configuration.image_url && icons[item.configuration.image_url]}">{{ item.configuration.label}}</b>
  </button>
</template>

<style lang="scss">
  .previewItem.simplified {
    display: flex;
    justify-content: center;

    .noImage {
      height: 37px;
      border-radius: 9px;
      width: 75px;

    }

    .regular {
      height: 37px;
      border-radius: 9px;
      width: 75px;
      margin-top: calc(50px/3);
      position: relative;

      .imageContainer {
        width: 38px;
        height: 38px;
        margin-top: -17px;
        margin-left: auto;
        margin-right: auto;
        background: white;
        border-radius: 100%;
        border-width: 2px;
        border-style: solid;
        z-index: 10;
        position: absolute;
        left: 17px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 23px;
          width: 23px;
        }
      }
    }
  }

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
    item: Object,
    simplified: Boolean,
    noImage: Boolean
  },
  data () {
    return {
      colors: colors,
      icons: icons
    }
  },
  inject: ["dropToBar"],
  methods: {
    addToBar: function (item, event) {
      this.dropToBar({
        data: item,
        type: event.srcElement._prevClass === "noImage"? "catalogButtonNoImage": "catalogButtonWithImage"
      })

    }
  }
}
</script>
