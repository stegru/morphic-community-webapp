<template>
  <div>
    <!-- MODALs: BEGIN -->
    <b-modal id="modalEditGeneric" @ok="refreshButton(true)" @cancel="refreshButton(false)" scrollable centered footer-bg-variant="light" ok-title="Update Button" size="lg">
      <div v-if="buttonEditStorage">
        <b-row>
          <b-col md="6">
            <h5><b>{{ buttonEditStorage.configuration.label }}</b></h5>
            <p>What text do you want on the button?</p>
            <div role="group" class="mb-3">
              <label for="modalEditGenericLabel">Text on the button</label>
              <b-form-input id="modalEditGenericLabel" v-model="buttonEditStorage.configuration.label" placeholder="Button text" />
            </div>
            <div class="bg-silver rounded p-3">
              <p v-if="editDialogDetails" class="text-right small mb-0">
                (<b-link @click="editDialogDetails = false">Hide</b-link>)
              </p>
              <p v-else class="small">
                Optional: <b-link @click="editDialogDetails = true">Customize the button (color &amp; picture)</b-link>
              </p>
              <div v-if="editDialogDetails">
                <h6><b>Color for button</b></h6>
                <div class="bg-white rounded p-3 mb-4">
                  <div
                    v-for="(hex, name) in colors"
                    :key="name"
                    @click="editChangeColor(hex)"
                    :title="name"
                    :class="{ active: (buttonEditStorage.configuration.color || colors.blue) === hex }"
                    class="colorBoxHolder"
                    >
                    <div :style="'background-color: ' + hex + ';'" class="colorBox"></div>
                  </div>
                </div>

                <h6><b>Picture for button</b></h6>
                <div v-if="buttonEditStorage.configuration.subkind && editSubKindIcons && editDialogSubkindIcons" class="bg-white rounded p-3">
                  <div
                    v-for="(filename, icon) in editSubKindIcons"
                    :key="icon"
                    @click="editChangeIcon(icon)"
                    :class="{ active: buttonEditStorage.configuration.image_url === icon }"
                    class="iconBoxHolder"
                    >
                    <div :style="'border-color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'" class="iconBox">
                      <b-img :src="'/icons/' + filename" :style="'color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'" />
                    </div>
                  </div>
                </div>
                <div v-else class="bg-white rounded p-3 compactIconHolder">
                  <div class="iconBoxHolder" :class="{ active: (!buttonEditStorage.configuration.image_url) }">
                    <div
                      @click="editChangeIcon('')"
                      :style="'border-color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'"
                      class="iconBox"
                      >
                      <p>No image</p>
                    </div>
                  </div>
                  <div
                    v-for="(filename, icon) in icons"
                    :key="icon"
                    @click="editChangeIcon(icon)"
                    :class="{ active: buttonEditStorage.configuration.image_url === icon }"
                    class="iconBoxHolder"
                    >
                    <div :style="'border-color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'" class="iconBox">
                      <b-img :src="'/icons/' + filename" :style="'color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'" />
                    </div>
                  </div>
                </div>
                <div v-if="buttonEditStorage.configuration.subkind && editSubKindIcons && editDialogSubkindIcons" class="text-center pt-2">
                  <b-button @click="editDialogSubkindIcons = false" variant="outline-dark" size="sm">Pick from more pictures</b-button>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="max-height bg-silver rounded p-3 pt-5 text-center">
              <p class="mt-5 mb-1">This is the button you are making</p>
              <div class="barPreview p-5 rounded">
                <PreviewItem :item="buttonEditStorage" />
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <!-- MODALs: END -->

    <!-- EDITOR v2 -->
    <b-row>
      <b-col md="3">
        <CommunityManager :community="community" :bars="barsList" :members="membersList" :activeMemberId="$route.query.memberId" :activeBarId="$route.query.memberId ? null : barDetails.id" />
      </b-col>
      <b-col md="6">
        <div id="barEditor" class="pt-2">
          <div id="bar-info">
            <h5 v-if="$route.query.memberId" class="mb-0">
              <b>Bar for {{ memberDetails.first_name }}</b>&nbsp;
              <span class="small">(<b-link>Edit Bar name</b-link>)</span>
            </h5>
            <b-form-group v-else-if="newBar" label="Bar Name" label-for="barName">
              <b-form-input v-model="barDetails.name" id="barName" placeholder="Enter new bar name" class="mb-2"></b-form-input>
            </b-form-group>
            <h5 v-else class="mb-0">
              <b>{{ barDetails.name === 'Default' ? 'Starter Bar' : barDetails.name }}</b>&nbsp;
              <span v-if="barDetails.name !== 'Default'" class="small">(<b-link>Edit Bar name</b-link>)</span>
            </h5>
          </div>
          <b-alert variant="success" :show="successAlert">
            <span v-if="newBar">{{ successAddMessage }}</span>
            <span v-else>{{ successUpdateMessage }}</span>
          </b-alert>

          <b-nav id="editorNav" tabs class="small">
            <b-nav-item :active="tab === 1" @click="tab = 1"><b-icon-person-circle></b-icon-person-circle>
              <span v-if="$route.query.memberId">
                User Details
              </span>
              <span v-else-if="getMembersCount() === 0">
                Unused Bar
              </span>
              <span v-else>
                Users ({{ getMembersCount() }})
              </span>
            </b-nav-item>
            <b-nav-item disabled :active="tab === 2" @click="tab = 2"><b-icon-gear-fill></b-icon-gear-fill> Bar Settings</b-nav-item>
            <b-nav-item disabled :active="tab === 3" @click="tab = 3"><b-icon-fullscreen></b-icon-fullscreen> Try it</b-nav-item>
            <b-button v-if="$route.query.memberId" @click="addPersonalBar" :variant="isChanged ? 'success' : 'outline-dark'" class="addButton" size="sm"><b-icon-arrow-clockwise></b-icon-arrow-clockwise> Save Bar &amp; Update</b-button>
            <b-button v-else-if="newBar" @click="addBar" :variant="isChanged ? 'success' : 'outline-dark'" class="updateButton" size="sm"><b-icon-arrow-clockwise></b-icon-arrow-clockwise> Add new bar</b-button>
            <b-button v-else @click="saveBar" :variant="isChanged ? 'success' : 'outline-dark'" class="updateButton" size="sm"><b-icon-arrow-clockwise></b-icon-arrow-clockwise> Save Bar &amp; Update</b-button>
          </b-nav>

          <div v-if="tab === 1" class="bg-light p-3">
            <button @click="tab = 0" type="button" aria-label="Close" class="close">×</button>
            <div v-if="$route.query.memberId">
              <h5><b-icon-person-circle></b-icon-person-circle> <b>{{ memberDetails.first_name }}</b></h5>
            </div>
            <div v-else-if="getMembersCount() === 0">
              <h5><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is NOT used</b></h5>
              <p class="mb-0">You can go back to the <b-link to="/dashboard">Dashboard</b-link> and invite members to use it.</p>
            </div>
            <div v-else>
              <h5><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is used by {{ getMembersCount() }} people</b></h5>
              <ul class="small mb-0">
                <li v-for="member in members" v-bind:key="member.id">
                  <p>{{ member.first_name }} {{ member.last_name }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div v-else-if="tab === 2" class="bg-light p-3">
            <button @click="tab = 0" type="button" aria-label="Close" class="close">×</button>
            <h5><b-icon-gear-fill></b-icon-gear-fill> <b>Morphic Bar settings</b></h5>
            <b-form-checkbox id="barOnRight" v-model="bar.settings.barOnRight" name="barOnRight" value="true" unchecked-value="false">
              Bar on the right of the screen
            </b-form-checkbox>
            <b-form-checkbox id="cannotClose" v-model="bar.settings.cannotClose" name="cannotClose" value="true" unchecked-value="false">
              Person cannot close bar
            </b-form-checkbox>
            <b-form-checkbox id="startsOpen" v-model="bar.settings.startsOpen" name="startsOpen" value="true" unchecked-value="false">
              Morphic Bar always starts open
            </b-form-checkbox>
          </div>
          <div v-else-if="tab === 3" class="bg-light p-3">
            <button @click="tab = 0" type="button" aria-label="Close" class="close">×</button>
            <h5><b-icon-fullscreen></b-icon-fullscreen> <b>Try this bar on your own computer</b></h5>
            <p>
              You need to have Morphic installed on your computer to try out bars in your community.
              <b-link to="/learn/how-to-install">Learn how to set up your computer</b-link>.
            </p>
            <b-button variant="primary">Try this Morphic Bar on my computer</b-button>
          </div>
          <div id="preview-holder" class="desktop fill-height mt-3">
            <div class="taskbarMac"></div>
            <b-row>
              <b-col md="8">
                <div id="preview-drawer" v-if="openDrawer">
                  <div class="barPreview pl-3 pt-3 pr-3 pb-0" v-on:drop="dropElement($event, false)" v-on:dragover="allowDrop">
                    <b-button @click="addToBarOrDrawer(false)" v-if="addToDrawer" variant="success" size="sm" class="btn-block mb-3">Add to Drawer</b-button>
                    <b-row v-if="drawerItems.length > 0">
                      <b-col md="6">
                        <div v-for="(item, index) in drawerItems" :key="item.configuration.label">
                          <div v-if="index < preview.drawer.h" class="previewHolder mb-3" draggable v-on:dragstart="dragTransfer($event, item)">
                            <PreviewItem :item="item" />
                            <b-icon-arrow-up-circle @click="buttonToMoveUp(item.configuration.label)" class="overlay icon-up p-1 bg-light rounded text-primary"></b-icon-arrow-up-circle>
                            <b-icon-arrow-down-circle @click="buttonToMoveDown(item.configuration.label)" class="overlay icon-down p-1 bg-light rounded text-primary"></b-icon-arrow-down-circle>
                            <b-icon-trash @click="buttonToRemove(item.configuration.label)" class="overlay icon-delete p-1 bg-light rounded text-primary"></b-icon-trash>
                            <b-icon-pencil @click="buttonToEdit(item.configuration.label)" class="overlay icon-edit p-1 bg-light rounded text-primary"></b-icon-pencil>
                          </div>
                        </div>
                      </b-col>
                      <b-col md="6">
                        <div v-for="(item, index) in drawerItems" :key="item.configuration.label">
                          <div v-if="index >= preview.drawer.h" class="previewHolder mb-3" draggable v-on:dragstart="dragTransfer($event, item)">
                            <PreviewItem :item="item" />
                            <b-icon-arrow-up-circle @click="buttonToMoveUp(item.configuration.label)" class="overlay icon-up p-1 bg-light rounded text-primary"></b-icon-arrow-up-circle>
                            <b-icon-arrow-down-circle @click="buttonToMoveDown(item.configuration.label)" class="overlay icon-down p-1 bg-light rounded text-primary"></b-icon-arrow-down-circle>
                            <b-icon-trash @click="buttonToRemove(item.configuration.label)" class="overlay icon-delete p-1 bg-light rounded text-primary"></b-icon-trash>
                            <b-icon-pencil @click="buttonToEdit(item.configuration.label)" class="overlay icon-edit p-1 bg-light rounded text-primary"></b-icon-pencil>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </div>
                <div v-else>
                  <BarExplainer :barDetails="barDetails" />
                </div>
              </b-col>
              <b-col md="4">
                <div id="preview-bar">
                  <div class="barPreview pl-2 pt-2 pr-2" v-on:drop="dropElement($event, true)" v-on:dragover="allowDrop">
                    <b-button @click="addToBarOrDrawer(true)" v-if="addToBar" variant="success" size="sm" class="btn-block mb-3">Add to Bar</b-button>
                    <div v-for="(item, index) in primaryItems" :key="index">
                      <div class="previewHolder mb-2" draggable v-on:dragstart="dragTransfer($event, item)">
                        <PreviewItem :item="item" />
                        <b-icon-arrow-up-circle @click="buttonToMoveUp(item.configuration.label)" class="overlay icon-up p-1 bg-light rounded text-primary"></b-icon-arrow-up-circle>
                        <b-icon-arrow-down-circle @click="buttonToMoveDown(item.configuration.label)" class="overlay icon-down p-1 bg-light rounded text-primary"></b-icon-arrow-down-circle>
                        <b-icon-trash @click="buttonToRemove(item.configuration.label)" class="overlay icon-delete p-1 bg-light rounded text-primary"></b-icon-trash>
                        <b-icon-pencil @click="buttonToEdit(item.configuration.label)" class="overlay icon-edit p-1 bg-light rounded text-primary"></b-icon-pencil>
                      </div>
                    </div>
                    <div class="logoHolder">
                      <b-img src="/img/logo-color.svg" />
                    </div>
                    <div class="openDrawerIconHolder">
                      <b-link @click="openDrawer = !openDrawer">
                        <b-icon :icon="openDrawer ? 'arrow-right-circle-fill' : 'arrow-left-circle-fill'"></b-icon>
                      </b-link>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
            <div class="taskbarWindows"></div>
          </div>
        </div>
      </b-col>
      <b-col md="3">
        <div id="buttonsPanel" class="fill-height bg-silver p-3">
          <b-input-group id="search-group" size="sm" class="mb-3">
            <b-form-input type="text" disabled></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" disabled><b-icon-search></b-icon-search></b-button>
            </b-input-group-append>
          </b-input-group>
          <h6><b>Make-a-Button</b></h6>
          <ul class="linkList list-unstyled mb-0">
            <li v-for="(button, index) in makeAButtons" :key="index" class="mb-1" :class="{ 'active': button.isActive }">
              <b-link draggable v-on:dragstart="dragElement($event, index, true)" @click="predefinedClicked($event, index, true)" :style="'color: ' + (button.configuration.color || colors.blue) + ';'">
                <b-img v-if="button.configuration.image_url && icons[button.configuration.image_url]" :src="'/icons/' + icons[button.configuration.image_url]" />
                <b-icon v-else icon="bootstrap"></b-icon>
                {{ button.configuration.label }}
                <b-icon-plus-circle-fill v-if="button.isActive" class="plus"></b-icon-plus-circle-fill>
              </b-link>
            </li>
          </ul>
          <br>
          <h6><b>Predefined Buttons</b></h6>
          <ul class="linkList list-unstyled mb-0">
            <li v-for="(button, index) in predefinedButtons" :key="index" class="mb-1" :class="{ 'active': button.isActive }">
              <b-link draggable v-on:dragstart="dragElement($event, index, false)" @click="predefinedClicked($event, index, false)" :style="'color: ' + (button.configuration.color || colors.blue) + ';'">
                <b-img v-if="button.configuration.image_url && icons[button.configuration.image_url]" :src="'/icons/' + icons[button.configuration.image_url]" />
                <b-icon v-else icon="bootstrap"></b-icon>
                {{ button.configuration.label }}
                <b-icon-plus-circle-fill v-if="button.isActive" class="plus"></b-icon-plus-circle-fill>
              </b-link>
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
  $primary-color: #002957;
  $secondary-color: #84c661;

  .max-height {
    height: 100%;
  }

  #editorNav {
    position: relative;
    .addButton, .updateButton {
      position: absolute;
      right: 0;
      top: 6px;
    }
  }

  .compactIconHolder {
    height: 22rem;
    overflow-y: auto;
    .iconBoxHolder {
      margin-left: .5rem !important;
    }
  }

  .colorBoxHolder {
    display: inline-block;
    cursor: pointer;
    margin: 0 .25rem;
    width: 2.6rem;
    height: 2.6rem;
    .colorBox {
      width: 2rem;
      height: 2rem;
    }
  }

  .iconBoxHolder {
    display: inline-block;
    cursor: pointer;
    width: 5.25rem;
    height: 5.25rem;
    margin: .75rem 0 .75rem .75rem;
    .iconBox {
      background: white;
      border: 1px solid black;
      border-radius: 100%;
      padding: .75rem;
      width: 4.5rem;
      height: 4.5rem;
      text-align: center;
      img {
        width: 3rem;
        height: 3rem;
      }
      p {
        width: 3rem;
        height: 3rem;
        line-height: 100%;
        margin: 0;
      }
    }
  }

  .colorBoxHolder, .iconBoxHolder {
    padding: .3rem;
    &.active {
      padding: .1rem;
      border: .2rem solid green;
    }
  }

  #modalEditGeneric {
    padding: .5rem 1rem 0 0;
    border-bottom: none;
  }

  #preview-drawer, #preview-bar {
    .barPreview {
      min-height: 600px;
    }
  }

  .previewHolder {
    position: relative;
    .overlay {
      position: absolute;
      top: 10px;
      color: $primary-color !important;
      background: rgba(255,255,255,0.7) !important;
      font-size: 1.5rem;
      cursor: pointer;
      &:hover {
        background: white !important;
      }
      &:active, &:focus {
        color: #d60000 !important;
      }
    }
    .icon-delete, .icon-edit {
      right: 10px;
    }
    .icon-edit {
      top: 40px;
    }
    .icon-up, .icon-down {
      left: 10px;
    }
    .icon-down {
      top: 40px;
    }
  }

  .text-disabled {
    color: gray;
    &:active, &:focus, &:hover {
      cursor: not-allowed;
      color: gray !important;
      text-decoration: none !important;
    }
  }

  .linkList {
    img {
      max-width: 1rem;
      height: 1rem;
    }
    li.active {
      background: white;
      padding: 10px;
      border: 1px solid $primary-color;
      outline: 0 !important;
      border-radius: .5rem;
      .plus {
        float: right;
        font-size: 1.5rem;
        color: $secondary-color;
      }
    }
  }
</style>

<script>

import CommunityManager from '@/components/dashboardV2/CommunityManager'
import BarExplainer from '@/components/dashboardV2/BarExplainer'
import EditorPreviewDrawer from '@/components/dashboard/EditorPreviewDrawer'
import PreviewItem from '@/components/dashboard/PreviewItem'
import { getCommunityBars, getCommunity, getCommunityBar, updateCommunityBar, createCommunityBar, getCommunityMembers, getCommunityMember, updateCommunityMember } from '@/services/communityService'
import { availableItems, colors, icons, subkindIcons, MESSAGES } from '@/utils/constants'
import predefinedBars from '@/utils/predefined'

export default {
  name: 'MemberInvite',
  components: {
    CommunityManager,
    BarExplainer,
    EditorPreviewDrawer,
    PreviewItem
  },
  methods: {
    addPersonalBar: function () {
      if (this.barDetails.is_shared) {
        this.barDetails.name = this.memberDetails.first_name
        this.barDetails.is_shared = false
        createCommunityBar(this.communityId, this.barDetails)
          .then((resp) => {
            if (resp.status === 200) {
              this.memberDetails.bar_id = resp.data.bar.id
              updateCommunityMember(this.communityId, this.memberDetails.id, this.memberDetails)
                .then((resp) => {
                  if (resp.status === 200) {
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
      createCommunityBar(this.communityId, this.barDetails)
        .then((resp) => {
          if (resp.status === 200) {
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
      updateCommunityBar(this.communityId, this.$route.query.barId, this.barDetails)
        .then((resp) => {
          if (resp.status === 200) {
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
    predefinedClicked: function (event, index, makeAButtons) {
      this.clearPredefinedActive()
      let currentLabel
      if (makeAButtons) {
        this.buttonStorage = this.makeAButtons[index]
        currentLabel = this.makeAButtons[index].configuration.label
      } else {
        this.buttonStorage = this.predefinedButtons[index]
        currentLabel = this.predefinedButtons[index].configuration.label
      }
      if (event.type === 'click') {
        if (makeAButtons) {
          this.makeAButtons[index].configuration.label = '[ACTIVE]'
          this.makeAButtons[index].isActive = true
          this.makeAButtons[index].configuration.label = currentLabel
        } else {
          this.predefinedButtons[index].configuration.label = '[ACTIVE]'
          this.predefinedButtons[index].isActive = true
          this.predefinedButtons[index].configuration.label = currentLabel
        }
      }
      if (this.getPrimaryButtonsCount() < this.preview.bar.h) {
        this.addToBar = true
      }
      if (this.getDrawerButtonsCount() < (this.preview.drawer.w * this.preview.drawer.h)) {
        this.addToDrawer = true
      }
    },
    clearPredefinedActive: function () {
      for (let i = 0; i < this.predefinedButtons.length; i++) {
        this.predefinedButtons[i].isActive = false
      }
      for (let i = 0; i < this.makeAButtons.length; i++) {
        this.makeAButtons[i].isActive = false
      }
    },
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
    findButtonByLabel: function (label) {
      let index = -1
      for (let i = 0; i < this.barDetails.items.length; i++) {
        if (this.barDetails.items[i].configuration.label === label) {
          index = i
        }
      }
      return index
    },
    buttonToRemove: function (label) {
      const index = this.findButtonByLabel(label)
      if (index !== -1) {
        this.barDetails.items.splice(index, 1)
        this.isChanged = true
      }
    },
    buttonToMoveUp: function (label) {
      let index = this.findButtonByLabel(label)
      if (index > 0) { // you cannot move button that can't be found (-1), or it's the first one (0)
        // getting the current and previous item
        let item = this.barDetails.items[index],
            isPrimary = this.barDetails.items[index].is_primary,
            itemOnTop = this.barDetails.items[index-1]
        // moving the current item up, and the one from the top to the current index
        this.barDetails.items[index-1] = item
        this.barDetails.items[index-1].is_primary = !isPrimary
        this.barDetails.items[index-1].is_primary = isPrimary
        this.barDetails.items[index] = itemOnTop
        this.isChanged = true
      }
    },
    buttonToMoveDown: function (label) {
      let index = this.findButtonByLabel(label),
          itemsCount = this.barDetails.items.length

      if (index !== -1 && index < (itemsCount -1 )) { // you cannot move button that can't be found (-1), or it's the last one
        // getting the current and next item
        let item = this.barDetails.items[index],
            isPrimary = this.barDetails.items[index].is_primary,
            itemOnBottom = this.barDetails.items[index+1]
        // moving the current item up, and the one from the top to the current index
        this.barDetails.items[index+1] = item
        this.barDetails.items[index+1].is_primary = !isPrimary
        this.barDetails.items[index+1].is_primary = isPrimary
        this.barDetails.items[index] = itemOnBottom
        this.isChanged = true
      }
    },
    buttonToEdit: function (label) {
      let index = this.findButtonByLabel(label)
      if (index !== -1) {
        this.buttonEditStorage = this.barDetails.items[index]
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
    },
    dragElement: function (event, index, makeAButtons) {
      this.predefinedClicked(event, index, makeAButtons)
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
    },
    dropElement: function (event, isPrimary) {
      this.addToBarOrDrawer(isPrimary)
      this.dragFromEditor = false
    },
    allowDrop: function (event) {
      event.preventDefault()
    },
    dragTransfer: function (event, button) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      this.dragFromEditor = true
      this.buttonStorage = button
    }
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId },
    primaryItems: function () {
      const data = []
      if (this.barDetails.items && this.barDetails.items.length > 0) {
        for (let i = 0; i < this.barDetails.items.length; i++) {
          if (this.barDetails.items[i].is_primary === true) {
            let newItem = this.barDetails.items[i]
            newItem.id = this.generateId(newItem)
            data.push(newItem)
          }
        }
      }
      return data
    },
    drawerItems: function () {
      const data = []
      if (this.barDetails.items && this.barDetails.items.length > 0) {
        for (let i = 0; i < this.barDetails.items.length; i++) {
          if (this.barDetails.items[i].is_primary === false) {
            let newItem = this.barDetails.items[i]
            newItem.id = this.generateId(newItem)
            data.push(newItem)
          }
        }
      }
      return data
    },
    makeAButtons: function() {
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
    predefinedButtons: function() {
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
    isChanged: function () {
      this.$store.dispatch('unsavedChanges', this.isChanged)
    },
    '$route.query': function () {
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
      successUpdateMessage: MESSAGES.barUpdated,
      successAddMessage: MESSAGES.barAdded,
      leavePageMessage: MESSAGES.leavePageAlert,

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
