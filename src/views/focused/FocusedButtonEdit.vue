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
import { getCommunityBar, saveCommunityBar, getCommunityMember, createCommunityBar, updateCommunityMember } from '@/services/communityService'
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

      // if we're editing a member's bar and it was previously a community bar:
      if (this.memberId && this.barDetails.is_shared) {
        this.saveAsNewPersonalBar();
      } else {
        this.saveBar();
      }
    },
    saveAsNewPersonalBar: function () {
      this.barDetails.name = `${this.memberDetails.first_name} ${this.memberDetails.last_name}`.trim();
      this.barDetails.is_shared = false;
      delete this.barDetails.id;
      createCommunityBar(this.communityId, this.barDetails).then((resp) => {
        if (resp.status === 200) {
          this.memberDetails.bar_id = resp.data.bar.id
          updateCommunityMember(this.communityId, this.memberDetails.id, this.memberDetails)
            .then((resp) => {
              if (resp.status === 200) {
                this.navigateBack();
              }
            })
            .catch(err => { // failed to update member
              console.error(err)
            })

        }
      }).catch(err => { // failed to create a community
        console.error(err)
      })
    },
    saveBar: function () {
      saveCommunityBar(this.communityId, this.barId, this.barDetails)
        .then(() => {
          this.navigateBack();
        })
        .catch(err => {
          console.error(err)
        })
    },
    navigateBack: function () {
      this.$router.push({ path: '/focused/bar-editor', query: { barId: this.barId, memberId: this.memberId } });
    },
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
    this.memberId = this.$route.query.memberId;


    // load bar and content (incl. button)
    getCommunityBar(this.communityId, this.barId).then(b => {
      this.barDetails = b.data;
      // find button:
      this.button = this.barDetails.items[this.buttonIndex];
      this.setAvailablePositions();
    });
    // load member if set:
    if (this.memberId) {
      getCommunityMember(this.communityId, this.memberId)
        .then((resp) => {
          this.memberDetails = resp.data
        })
        .catch(err => {
          console.error(err)
        })
      }
  },
  watch: {
  },
  data () {
    return {
      barDetails: {},
      barId: undefined,
      buttonIndex: undefined,
      communityId: undefined,
      memberId: undefined,
      memberDetails: undefined,
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
