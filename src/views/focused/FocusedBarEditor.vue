<template>

  <div>
    <h1>Morphic Bar Editor</h1>
    <b-link to="/focused/home">Go back to community home</b-link>

    <h2>{{ barDetails.name }}</h2>
    <!-- <b-nav  class="small"> -->
      <b-link :to="{ name: 'Focused: People using bar', query: { barId: barDetails.id } }">
        <b-icon-person-circle></b-icon-person-circle>
        <span v-if="$route.query.memberId">
          User Details
        </span>
        <span v-else-if="getMembersCount() === 0">
          Unused Bar
        </span>
        <span v-else>
          People using this bar ({{ getMembersCount() }})
        </span>
      </b-link>
      <br/>
      <b-link :to="{ name: 'Focused: Bar settings', query: { barId: barDetails.id } }">
        Morphic Bar Settings
      </b-link>
    <!-- </b-nav> -->

    <h2>Buttons on the Bar</h2>
    <!-- <div v-for="(item, index) in primaryItems" :key="index">
      <div class="previewHolder mb-2" style="width: 200px">
        <PreviewItem @click.native="buttonToEdit(item)" :item="item" />
      </div>
    </div> -->
    <ol>
      <li v-for="(item, index) in primaryItems" :key="index">
        <b-link :to="{ name: 'Focused: Button edit', query: { barId: barDetails.id } }">
          {{item.configuration.label}} {{item.id}}
        </b-link>
      </li>
    </ol>

    <b-link :to="{ name: 'Focused: Button Catalog', query: { barId: barDetails.id } }">
      Add a Button
    </b-link>
    <!-- <button>Save Bar and Update</button> -->

  </div>
</template>

<style lang="scss">
</style>

<script>

import CommunityManager from '@/components/dashboardV2/CommunityManager'
import BarExplainer from '@/components/dashboardV2/BarExplainer'
import PreviewItem from '@/components/dashboard/PreviewItem'
import { getCommunityBars, deleteCommunityBar, getCommunity, getCommunityBar, updateCommunityBar, createCommunityBar, getCommunityMembers, getCommunityMember, updateCommunityMember, deleteCommunityMember } from '@/services/communityService'
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
    // preventDuplicated: function (event) {
    //   for (let i = 0; i < this.activeButtons.length; i++) {
    //     if (this.activeButtons[i].configuration.label === event.draggedContext.element.configuration.label) {
    //       return false
    //     }
    //   }
    // },
    // dropFromList: function (event) {
    //   event.item.classList.remove('draggedListItem')
    // },
    // dragFromList: function (event, makeAButton) {
    //   event.item.className = 'draggedListItem'
    //   if (makeAButton) {
    //     this.dragMakeAButton = false
    //   } else {
    //     this.dragPredefinedButton = false
    //   }
    // },
    getMakeAButtons: function () {
      let buttons = []
      if (availableItems && availableItems.length > 0) {
        for (let i = 0; i < availableItems.length; i++) {
          if (availableItems[i].configuration.subkind) {
            let item = availableItems[i]
            item.isActive = false
            item.configuration.color = item.configuration.color || ''
            item.configuration.image_url = item.configuration.image_url || ''
            buttons.push(item)
          }
        }
      }
      return buttons
    },
    getPredefinedButtons: function () {
      let buttons = []
      if (availableItems && availableItems.length > 0) {
        for (let i = 0; i < availableItems.length; i++) {
          if (!availableItems[i].configuration.subkind) {
            let item = availableItems[i]
            item.isActive = false
            item.configuration.color = item.configuration.color || ''
            item.configuration.image_url = item.configuration.image_url || ''
            buttons.push(item)
          }
        }
      }
      return buttons
    },
    getDrawerItems: function (items) {
      const data = []
      if (items && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].is_primary === false) {
            const newItem = items[i]
            newItem.id = this.generateId(newItem)
            if (data.length >= this.preview.drawer.h) {
              this.drawerItemsSecond.push(newItem)
            } else {
              data.push(newItem)
            }
          }
        }
      }
      this.drawerItems = data
    },
    getPrimaryItems: function (items) {
      const data = []
      if (items && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].is_primary === true) {
            const newItem = items[i]
            newItem.id = this.generateId(newItem)
            data.push(newItem)
          }
        }
      }
      this.primaryItems = data
    },
    // deleteUser: function () {
    //   deleteCommunityMember(this.communityId, this.memberDetails.id)
    //     .then((resp) => {
    //       if (resp.status === 200) {
    //         this.successMessage = MESSAGES.successfulUserDelete
    //         this.successAlert = true
    //         setTimeout(() => {
    //           this.$router.push('/dashboard')
    //         }, 3000)
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // changeUserRole: function () {
    //   if (this.memberDetails.role === 'member') {
    //     this.memberDetails.role = 'manager'
    //   } else {
    //     this.memberDetails.role = 'member'
    //   }
    //   updateCommunityMember(this.communityId, this.memberDetails.id, this.memberDetails)
    //     .then((resp) => {
    //       if (resp.status === 200) {
    //         this.successMessage = MESSAGES.successfulRoleChange
    //         this.successAlert = true
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    addPersonalBar: function () {
      if (this.barDetails.is_shared) {
        this.onSave = true

        this.barDetails.name = this.memberDetails.first_name
        this.barDetails.is_shared = false

        const data = this.barDetails
        const drawerItems = this.drawerItems.concat(this.drawerItemsSecond)
        data.items = this.primaryItems.concat(drawerItems)

        createCommunityBar(this.communityId, data)
          .then((resp) => {
            if (resp.status === 200) {
              this.memberDetails.bar_id = resp.data.bar.id
              updateCommunityMember(this.communityId, this.memberDetails.id, this.memberDetails)
                .then((resp) => {
                  if (resp.status === 200) {
                    this.successMessage = MESSAGES.barAdded
                    this.successAlert = true
                    this.isChanged = false
                    setTimeout(() => {
                      this.$router.push('/dashboard')
                    }, 3000)
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.saveBar()
      }
    },
    addBar: function () {
      this.onSave = true
      const data = this.barDetails
      const drawerItems = this.drawerItems.concat(this.drawerItemsSecond)
      data.items = this.primaryItems.concat(drawerItems)

      createCommunityBar(this.communityId, data)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.barAdded
            this.successAlert = true
            this.isChanged = false
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 3000)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    saveBar: function () {
      this.onSave = true
      const data = this.barDetails
      const drawerItems = this.drawerItems.concat(this.drawerItemsSecond)
      data.items = this.primaryItems.concat(drawerItems)

      updateCommunityBar(this.communityId, this.$route.query.barId, data)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.barUpdated
            this.successAlert = true
            this.isChanged = false
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 3000)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteBar: function () {
      deleteCommunityBar(this.communityId, this.$route.query.barId)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.successfulBarDelete
            this.successAlert = true
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 3000)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // predefinedClicked: function (event, index, makeAButtons) {
    //   this.clearPredefinedActive()
    //   let currentLabel
    //   if (makeAButtons) {
    //     this.buttonStorage = this.makeAButtons[index]
    //     currentLabel = this.makeAButtons[index].configuration.label
    //   } else {
    //     this.buttonStorage = this.predefinedButtons[index]
    //     currentLabel = this.predefinedButtons[index].configuration.label
    //   }
    //   if (event.type === 'click') {
    //     if (makeAButtons) {
    //       this.makeAButtons[index].configuration.label = '[ACTIVE]'
    //       this.makeAButtons[index].isActive = true
    //       this.makeAButtons[index].configuration.label = currentLabel
    //     } else {
    //       this.predefinedButtons[index].configuration.label = '[ACTIVE]'
    //       this.predefinedButtons[index].isActive = true
    //       this.predefinedButtons[index].configuration.label = currentLabel
    //     }
    //   }
    //   if (this.getPrimaryButtonsCount() < this.preview.bar.h) {
    //     this.addToBar = true
    //   }
    //   if (this.getDrawerButtonsCount() < (this.preview.drawer.w * this.preview.drawer.h)) {
    //     this.addToDrawer = true
    //   }
    // },
    // clearPredefinedActive: function () {
    //   for (let i = 0; i < this.predefinedButtons.length; i++) {
    //     this.predefinedButtons[i].isActive = false
    //   }
    //   for (let i = 0; i < this.makeAButtons.length; i++) {
    //     this.makeAButtons[i].isActive = false
    //   }
    // },
    addToBarOrDrawer: function (is_primary) {
      this.clearPredefinedActive()
      if (this.buttonStorage) {
        // setting the primary attribute based on which bar it's added to
        this.buttonStorage.is_primary = is_primary
        // checking if this button already exists
        if (this.barDetails.items.length > 0) {
          let existingIndex = -1
          for (let i = 0; i < this.barDetails.items.length; i++) {
            if (this.barDetails.items[i].configuration.label === this.buttonStorage.configuration.label) {
              existingIndex = i
            }
          }
          if (existingIndex !== -1) {
            // removing the old version
            this.barDetails.items.splice(existingIndex, 1)
          }
        }
        // adding the item
        this.barDetails.items.push(this.buttonStorage)
        // cleaning up the storage
        this.buttonStorage = {}
      }
      this.isChanged = true
      this.addToBar = false
      this.addToDrawer = false
    },
    findButtonByLabel: function (item) {
      const data = {
        index: -1,
        drawerSecond: false
      }
      if (item.is_primary) {
        for (let i = 0; i < this.primaryItems.length; i++) {
          if (this.primaryItems[i].configuration.label === item.configuration.label) {
            data.index = i
          }
        }
      } else {
        if (this.drawerSecondColumn) {
          for (let i = 0; i < this.drawerItemsSecond.length; i++) {
            if (this.drawerItemsSecond[i].configuration.label === item.configuration.label) {
              data.index = i
              data.drawerSecond = true
            }
          }
        }
        for (let i = 0; i < this.drawerItems.length; i++) {
          if (this.drawerItems[i].configuration.label === item.configuration.label) {
            data.index = i
          }
        }
      }
      return data
    },
    buttonToRemove: function (item) {
      console.log(item)
      const foundItem = this.findButtonByLabel(item)
      if (foundItem.index !== -1) {
        if (item.is_primary) {
          this.primaryItems.splice(foundItem.index, 1)
        } else {
          if (foundItem.drawerSecond) {
            this.drawerItemsSecond.splice(foundItem.index, 1)
          } else {
            this.drawerItems.splice(foundItem.index, 1)
          }
        }
        this.$bvModal.hide('modalEditGeneric')
        this.isChanged = true
      }
    },
    buttonToEdit: function (item) {
      const foundItem = this.findButtonByLabel(item)
      if (foundItem.index !== -1) {
        if (item.is_primary) {
          this.buttonEditStorage = this.primaryItems[foundItem.index]
        } else {
          if (foundItem.drawerSecond) {
            this.buttonEditStorage = this.drawerItemsSecond[foundItem.index]
          } else {
            this.buttonEditStorage = this.drawerItems[foundItem.index]
          }
        }
        this.$bvModal.show('modalEditGeneric')
      }
    },
    refreshButton: function (updated) {
      // updating the data in a button (on edit)
      this.editDialogDetails = false
      this.editDialogSubkindIcons = true
      if (updated) {
        this.isChanged = true
      }
    },
    editChangeColor: function(hex) {
      this.buttonEditStorage.configuration.color = hex
    },
    editChangeIcon: function(icon) {
      this.buttonEditStorage.configuration.image_url = icon
    },
    getMembersCount: function () {
      if (this.members && this.members.length > 0) {
        return this.members.length
      }
      return 0
    },
    getPrimaryButtonsCount: function () {
      return this.primaryItems.length
    },
    getDrawerButtonsCount: function () {
      return this.drawerItems.length
    },
    loadBarMembers: function () {
      getCommunityBars(this.communityId)
        .then(resp => {
          const barsData = resp.data.bars
          getCommunityMembers(this.communityId)
            .then((resp) => {
              this.barsList = barsData
              this.membersList = resp.data.members
              if (resp.data.members.length > 0) {
                for (let i = 0; i < resp.data.members.length; i++) {
                  if (this.$route.query.barId === resp.data.members[i].bar_id) {
                    this.members.push(resp.data.members[i])
                  }
                }
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getBarRemoveValidity: function () {
      if (this.barDetails.name !== 'Default' && this.getMembersCount() === 0) {
        return true
      }
      return false
    },
    loadMemberData: function () {
      getCommunityMember(this.communityId, this.$route.query.memberId)
        .then((resp) => {
          this.memberDetails = resp.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCommunityData: function() {
      getCommunity(this.communityId)
        .then((community) => {
          this.community = community.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    generateId: function(item) {
      let id = ""
      if (item) {
        id+= Math.floor(Math.random() * Math.floor(99999999))
        id+= "-" + item.configuration.label.toLowerCase()
        id+= "-" + (item.configuration.subkind ? "sub-" + item.configuration.subkind.toLowerCase() : "generic-kind")
        id+= "-" + Math.floor(Math.random() * Math.floor(99999999))
      }
      return id
    }
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId },
    activeButtons: function () {
      let activeButtons = []
      activeButtons = this.primaryItems.concat(this.drawerItems, this.drawerItemsSecond)
      return activeButtons
    },
    drawerSecondColumn: function () {
      if (this.drawerItems.length >= this.preview.drawer.h || this.drawerItemsSecond.length > 0) {
        return true
      } else {
        return false
      }
    },
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
    } else if (this.$route.query.barId.indexOf('predifined') !== -1) {
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
          console.log(err)
        })
    }
    if (this.$route.query.memberId) {
      this.loadMemberData()
    }
    this.loadBarMembers()
    this.getCommunityData()
  },
  watch: {
    'barDetails.items': function (newValue, oldValue) {
      if (!this.onSave) {
        this.getDrawerItems(newValue)
        this.getPrimaryItems(newValue)
      }
    },
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
          console.log(err)
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
      members: [],
      memberDetails: {},
      drawerItems: [],
      drawerItemsSecond: [],
      primaryItems: [],
      makeAButtons: this.getMakeAButtons(),
      predefinedButtons: this.getPredefinedButtons(),

      // configurations
      preview: {
        drawer: {
          w: 2,
          h: 6
        },
        bar: {
          h: 6
        }
      },
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
      makeButtonList: [
        {
          label: 'Button to start a call...',
          icon: 'chat'
        },
        {
          label: 'Button to join a meeting...',
          icon: 'people-fill'
        },
        {
          label: 'Button to open online photo album...',
          icon: 'images'
        },
        {
          label: 'Button to open calendar...',
          icon: 'calendar3'
        },
        {
          label: 'Button to open web page...',
          icon: 'link'
        },
        {
          label: 'Button to open an app...',
          icon: 'app'
        },
        {
          label: 'Button to make all distractions go away...',
          icon: 'headphones'
        }
      ]
    }
  }
}
</script>

