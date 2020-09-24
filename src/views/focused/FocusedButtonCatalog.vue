<template>
  <div>
      <h1>Button Catalog: Buttons you can add</h1>
      <a href="#">About the Morphic Button Catalog</a>
      <br/>
      <em>To add a button to the Morphic Bar, press on its name.</em>
      <b-link :to="{ name: 'Focused: Bar Editor', query: { barId: barDetails.id } }">
        Go back without adding a button
      </b-link>
          <br>
          <h6><b>Predefined Buttons</b></h6>
          <ul class="buttonsCatalogListing linkList list-unstyled mb-0">
            <!-- Button catalog headings -->
            <li v-for="(buttonGroup, categoryName) in buttonCatalog" :key="categoryName" class="buttonsCatalogHeader">
              <h4>{{categoryName}}</h4>
              <ul class="ButtonsCatalogEntries">
                <li v-for="(button, buttonId) in buttonGroup" :key="buttonId" class="buttonsCatalogEntry">
                  <b-link @click="focusedAddButtonToBar(button, buttonId)" :style="'color: ' + (button.configuration.color || colors.blue) + ';'"  class="buttonsCatalogEntry nonExpandedCatalogEntry">
                    <b-img v-if="button.configuration.image_url && icons[button.configuration.image_url]" :src="'/icons/' + icons[button.configuration.image_url]" />
                    <b-icon v-else icon="bootstrap"></b-icon>
                      {{ button.configuration.label }}
                  </b-link>
                </li>
              </ul>
            </li>
          </ul>
  </div>
</template>

<style lang="scss">

    .ButtonsCatalogEntries {
      padding-inline-start: 17px;
      list-style: none;
      .buttonsCatalogEntry {
        .active {
          background-color: #e0f1d7;
          border: solid 1px #008145;
          border-radius: 5px;
          padding: 10px;

          .buttons {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
          }

          h3 {
            margin-top: 15px;
            font-size: 20px;
            margin-bottom: 0px;
          }

          div.description {
            font-size: 14px;
          }

          div.help {
            font-size: 14px;
            font-weight: bold;
            margin-top: 15px;
            line-height: 18px;
          }
        }
      }
    }

</style>

<script>

import CommunityManager from '@/components/dashboardV2/CommunityManager'
import BarExplainer from '@/components/dashboardV2/BarExplainer'
import PreviewItem from '@/components/dashboard/PreviewItem'
import { getCommunityBars, deleteCommunityBar, getCommunity, getCommunityBar, updateCommunityBar, createCommunityBar, getCommunityMembers, getCommunityMember, updateCommunityMember, deleteCommunityMember } from '@/services/communityService'
import { buttonCatalog, colors, icons, subkindIcons, MESSAGES } from '@/utils/constants'
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
    focusedAddButtonToBar: function (button, idx) {
        // this.$router.push('/focused/home'); // sgithens TODO add barId
        delete button.isActive;
        // this.primaryItems.push(button);


      this.onSave = true
      const data = this.barDetails
      data.items.push(button);
      // const drawerItems = this.drawerItems.concat(this.drawerItemsSecond)
      // data.items = this.primaryItems.concat(drawerItems)
      updateCommunityBar(this.communityId, this.$route.query.barId, data)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.barUpdated
            this.successAlert = true
            this.isChanged = false
            setTimeout(() => {
              this.$router.push('/focused/home')
            }, 3000)
          }
        })
        .catch(err => {
          console.err(err)
        })
    }
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId },
    editSubKindIcons: function() {
      let data = {}
      if (this.buttonEditStorage.configuration.subkind && this.subkindIcons[this.buttonEditStorage.configuration.subkind]) {
        for (let i = 0; i < this.subkindIcons[this.buttonEditStorage.configuration.subkind].length; i++) {
          data[this.subkindIcons[this.buttonEditStorage.configuration.subkind][i]] = icons[this.subkindIcons[this.buttonEditStorage.configuration.subkind][i]]
        }
      }
      return data
    }
  },
  mounted () {
    if (this.$route.query.barId === 'new') {
      this.newBar = true
      this.barDetails = this.newBarDetails
    } else if (this.$route.query.barId.indexOf('predefined') !== -1) {
      for (let i = 0; i < this.predefinedBars.length; i++) {
        if (this.predefinedBars[i].id === this.$route.query.barId) {
          this.newBar = true
          this.barDetails = this.newBarDetails
          this.barDetails.items = this.predefinedBars[i].items
        }
      }
    } else {
      getCommunityBar(this.communityId, this.$route.query.barId)
        .then(resp => {
          this.barDetails = resp.data
        })
        .catch(err => {
          console.err(err)
        })
    }
    if (this.$route.query.memberId) {
      this.loadMemberData()
    }
  },
  watch: {
    makeAButtons: function (newValue, oldValue) {
      if (!this.dragMakeAButton) {
        this.makeAButtons = oldValue
        this.dragMakeAButton = true
      }
    },
    predefinedButtons: function (newValue, oldValue) {
      if (!this.dragPredefinedButton) {
        this.predefinedButtons = oldValue
        this.dragPredefinedButton = true
      }
    },
    primaryItems: function (newValue, oldValue) {
      if (oldValue.length === 0 && !this.initialChangesPrimaryItems) {
        this.initialChangesPrimaryItems = true
      } else if (this.initialChangesPrimaryItems && oldValue.length !== newValue.length) {
        this.isChanged = true
      }
      let item = {}
      if (newValue && newValue.length > 0) {
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[i].is_primary === false) {
            item = newValue[i]
            item.is_primary = true
          }
          if (i >= this.preview.bar.h) {
            this.drawerItems.push(this.primaryItems[i])
            this.primaryItems.splice(i, 1)
            this.openDrawer = true
          }
        }
      }
    },
    drawerItems: function (newValue, oldValue) {
      if (oldValue.length === 0 && !this.initialChangesDrawerItems) {
        this.initialChangesDrawerItems = true
      } else if (this.initialChangesDrawerItems && oldValue.length !== newValue.length) {
        this.isChanged = true
      }
      let item = {}
      if (newValue && newValue.length > 0) {
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[i].is_primary === true) {
            item = newValue[i]
            item.is_primary = false
          }
          if (i >= this.preview.drawer.h) {
            this.drawerItemsSecond.push(this.drawerItems[i])
            this.drawerItems.splice(i, 1)
          }
        }
      }
    },
    drawerItemsSecond: function (newValue, oldValue) {
      if (oldValue.length !== newValue.length) {
        this.isChanged = true
      }
      let item = {}
      if (newValue && newValue.length > 0) {
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[i].is_primary === true) {
            item = newValue[i]
            item.is_primary = false
          }
        }
      }
    },
    isChanged: function () {
      this.$store.dispatch('unsavedChanges', this.isChanged)
    },
    '$route.query': function () {
      this.initialChangesPrimaryItems = false
      this.initialChangesDrawerItems = false
      if (this.$route.query.memberId) {
        this.loadMemberData()
      }
      getCommunityBar(this.communityId, this.$route.query.barId)
        .then(resp => {
          this.barDetails = resp.data
          this.members = []
          this.loadBarMembers()
          this.getCommunityData()
        })
        .catch(err => {
          console.err(err)
        })
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (this.isChanged) {
      const confirm = window.confirm(this.leavePageMessage)
      if (confirm) {
        this.isChanged = false
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isChanged) {
      const confirm = window.confirm(this.leavePageMessage)
      if (confirm) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  data () {
    return {
      // messages
      leavePageMessage: MESSAGES.leavePageAlert,
      successMessage: '',

      // flags
      addToBar: false,
      addToDrawer: false,
      newBar: false,
      openDrawer: false,
      successAlert: false,
      editDialogDetails: false,
      editDialogSubkindIcons: true,
      tab: 0,
      dragFromEditor: false,
      isChanged: false,
      editBarName: false,
      onSave: false,
      initialChangesPrimaryItems: false,
      initialChangesDrawerItems: false,
      // data for the community manager
      community: {},
      barsList: [],
      membersList: [],

      // storage
      buttonStorage: {},
      buttonEditStorage: {
        configuration: {
          label: '',
          color: '',
          image_url: ''
        }
      },
      barDetails: {},
      buttonCatalog: buttonCatalog,
      newBarDetails: {
        name: 'New Bar',
        is_shared: false,
        items: []
      },
      bar: {
        settings: {
          barOnRight: true,
          cannotClose: false,
          startsOpen: false
        }
      },
      predefinedBars: predefinedBars,
      colors: colors,
      icons: icons,
      subkindIcons: subkindIcons,
    }
  }
}
</script>
