<template>
  <div>
    <h1>Edit Button: {{ button.configuration && button.configuration.label}} </h1>
     <b-form>
        <b-form-group id="name" label="Text on the button" label-for="button-label-input">
          <b-form-input id="button-label-input" v-model="button.configuration.label"></b-form-input>
        </b-form-group>

        <!-- TODO CHANGE ICONS -->

        <b-form-group id="color" label="Color for button" label-for="button-color-input">
          <b-form-select id="button-color-input" v-model="button.configuration.color">
            <b-form-select-option v-for="(hex, name) in userFriendlyColors" :key="hex" :value="hex">{{name}}</b-form-select-option>
          </b-form-select>
        </b-form-group>


        <b-form-group id="position" label="Change position" label-for="button-position-input">
          <b-form-select id="button-position-input" v-model="newButtonIndex">
            <b-form-select-option v-for="(text, index) in availablePositions" :key="index" :value="index">{{text}}</b-form-select-option>
          </b-form-select>
        </b-form-group>


     </b-form>

    <b-link :to="{ path: '/focused/bar-editor', query: { barId: barId } }">
      Cancel
    </b-link>
    <button @click="save">Save</button>
  </div>
</template>

<style lang="scss">
</style>

<script>

import CommunityManager from '@/components/dashboardV2/CommunityManager'
import BarExplainer from '@/components/dashboardV2/BarExplainer'
import PreviewItem from '@/components/dashboard/PreviewItem'
import { getCommunityBar, saveCommunityBar } from '@/services/communityService'
import { availableItems, colors, icons, subkindIcons, MESSAGES } from '@/utils/constants'
import { predefinedBars } from '@/utils/predefined'
import draggable from 'vuedraggable'

export default {
  name: 'MemberInvite',
  components: {
    CommunityManager,
    BarExplainer,
    PreviewItem,
    draggable
  },
  methods: {
    setAvailablePositions: function () {
      this.availablePositions = {};
      console.log('aksepr')
      for (let i=0; i<this.barDetails.items.length; i++) {
        this.availablePositions[i] = `Button position ${i+1} of ${this.barDetails.items.length}`;
      }
    },
    save: function () {
      // udpate position if it has changed:
      if (this.buttonIndex != this.newButtonIndex) {
        // delete old
        this.barDetails.items.splice(this.buttonIndex, 1);
        // insert new
        this.barDetails.items.splice(this.newButtonIndex, 0, this.button);
      }
      // saveCommunityBar
      console.log(this.barDetails);
      saveCommunityBar(this.communityId, this.barId, this.barDetails).then(() => {
        this.$router.push({ path: '/focused/bar-editor', query: { barId: this.barId } });
      });
    }
  },
  computed: {
    userFriendlyColors: function () {
      let newMap = {};
      for (let name in this.colors) {
        if (name == "default_button") {
          newMap["Default"] = this.colors[name];
        } else { // uppercase first letter
          let newKey = name.charAt(0).toUpperCase() + name.slice(1)
          newMap[newKey] = this.colors[name];
        }
      }
      return newMap;
    }
  },
  mounted () {
    this.barId = this.$route.query.barId;
    this.buttonIndex = this.$route.query.buttonIndex;
    this.newButtonIndex = this.buttonIndex;
    this.communityId = this.$route.query.communityId;


    // load bar and content (incl. button)
    getCommunityBar(this.communityId, this.barId).then(b => {
      this.barDetails = b.data;
      // find button:
      this.button = this.barDetails.items[this.buttonIndex];
      this.setAvailablePositions();
      console.log(this.button);
    })
  },
  watch: {
  },
  beforeRouteUpdate (to, from, next) {
    // if (this.isChanged) {
    //   const confirm = window.confirm(this.leavePageMessage)
    //   if (confirm) {
    //     this.isChanged = false
    //     next()
    //   } else {
    //     next(false)
    //   }
    // } else {
      next()
    // }
  },
  beforeRouteLeave (to, from, next) {
    // if (this.isChanged) {
    //   const confirm = window.confirm(this.leavePageMessage)
    //   if (confirm) {
    //     next()
    //   } else {
    //     next(false)
    //   }
    // } else {
      next()
    // }
  },
  data () {
    return {
      barDetails: {},
      barId: undefined,
      buttonIndex: undefined,
      communityId: undefined,
      originalButton: undefined,
      newButtonIndex: undefined,
      button: {
        configuration: {}
      },
      colors: colors,
      availablePositions: {}
    }
  }
}
</script>
