<template>
  <div>
    <h5>Morphic Bar Editor</h5>
    <div class="bg-silver rounded p-3">
      <b-row>
        <b-col md="3">
          <b-input-group id="search-group" size="sm" class="mb-3">
            <b-form-input type="text" disabled></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" disabled><b-icon-search></b-icon-search></b-button>
            </b-input-group-append>
          </b-input-group>
          <h6><b>Make-a-Button</b></h6>
          <ul class="list-unstyled mb-3">
            <li v-for="button in makeButtonList" v-bind:key="button.label" class="mb-1">
              <b-link disabled class="text-disabled">
                <b-icon :icon="button.icon"></b-icon>
                {{ button.label }}
              </b-link>
            </li>
          </ul>
          <h6><b>Predefined Buttons</b></h6>
          <ul class="linkList list-unstyled mb-0">
            <li v-for="(button, index) in predefinedButtons" :key="index" class="mb-1" :class="{ 'active': button.isActive }">
              <b-link @click="predefinedClicked(index)" :style="'color: ' + (button.configuration.color || colors.blue) + ';'">
                <b-icon :icon="button.configuration.image_url || 'bootstrap'"></b-icon>
                {{ button.configuration.label }}
              </b-link>
            </li>
          </ul>
        </b-col>
        <b-col md="9">
          <div id="bar-info">
            <h5>
              <b>
                {{ bar.name }}
              </b>
              <span class="d-none small">(<b-link>Edit Bar name</b-link>)</span>
            </h5>
          </div>
          <b-tabs content-class="bg-light p-3" small>
            <b-tab active>
              <template v-slot:title>
                <b-icon-person-circle></b-icon-person-circle>
                <span v-if="getMembersCount() === 0">
                  Unused Bar
                </span>
                <span v-else-if="getMembersCount() === 1">
                  Personalized Bar
                </span>
                <span v-else>
                  Users ({{ getMembersCount() }})
                </span>
              </template>
              <div v-if="getMembersCount() === 0">
                <h5><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is NOT used</b></h5>
                <p class="mb-0">You can go back to the <b-link to="/dashboard">Dashboard</b-link> and invite members to use it.</p>
              </div>
              <div v-else-if="getMembersCount() === 1">
                <h5><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is used by only one user</b></h5>
                <p class="mb-0">
                  <b>{{ memberData.first_name }} {{ memberData.last_name }}</b><br>
                  {{ memberData.email }}<br>
                  Joined: {{ memberData.joined }}
                </p>
              </div>
              <div v-else>
                <h5><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is used by {{ getMembersCount() }} people</b></h5>
                <ul class="small mb-0">
                  <li v-for="member in bar.members" v-bind:key="member.id">
                    <b-link :to="'/dashboard/member/' + member.id">{{ member.first_name }} {{ member.last_name }}</b-link>
                  </li>
                </ul>
              </div>
            </b-tab>
            <b-tab disabled>
              <template v-slot:title>
                <b-icon-gear-fill></b-icon-gear-fill>
                Bar Settings
              </template>
              <div>
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
            </b-tab>
            <b-tab disabled>
              <template v-slot:title>
                <b-icon-fullscreen></b-icon-fullscreen>
                Try it
              </template>
              <div>
                <h5><b-icon-fullscreen></b-icon-fullscreen> <b>Try this bar on your own computer</b></h5>
                <p>
                  You need to have Morphic installed on your computer to try out bars in your community.
                  <b-link to="/learn/how-to-install">Learn how to set up your computer</b-link>.
                </p>
                <b-button variant="primary">Try this Morphic Bar on my computer</b-button>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <b-icon-cloud-upload></b-icon-cloud-upload>
                <b>&nbsp;Save &amp; Update</b>
              </template>
              <div>
                <h5><b-icon-cloud-upload></b-icon-cloud-upload> <b>Save bar &amp; Update bar for all users</b></h5>
                <p class="small">
                  Save your changes to the buttons on the bar. This will update the bar on users' computers. Sometimes a computer will need to be restarted to get the updates.
                </p>
                <b-button to="/dashboard" variant="primary" size="sm">Save &amp; Update bar for the users ({{ getMembersCount() }})</b-button>
              </div>
            </b-tab>
          </b-tabs>
          <div id="preview-holder">
            <b-row>
              <b-col md="8">
                <br>
                <div id="preview-drawer">
                  <div class="barPreview pl-3 pt-3 pr-3 pb-0">
                    <b-row v-if="drawerItems.length > 0">
                      <b-col md="6">
                        <div v-for="(item, index) in drawerItems" :key="item.configuration.label">
                          <div v-if="index < preview.drawer.h" class="previewHolder mb-3">
                            <PreviewItem :item="item" />
                            <b-icon-trash @click="buttonToRemove(index)" class="overlay icon-delete p-1 bg-light rounded text-primary"></b-icon-trash>
                          </div>
                        </div>
                      </b-col>
                      <b-col md="6">
                        <div v-for="(item, index) in drawerItems" :key="item.configuration.label">
                          <div v-if="index >= preview.drawer.h" class="previewHolder mb-3">
                            <PreviewItem :item="item" />
                            <b-icon-trash @click="buttonToRemove(index)" class="overlay icon-delete p-1 bg-light rounded text-primary"></b-icon-trash>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                    <b-button @click="addToBarOrDrawer(false)" v-if="addToDrawer" variant="success" size="sm" class="btn-block mb-3">Add to Bar</b-button>
                    <div v-else class="pt-5 pb-5 text-center">
                      Click on the buttons on the left to add them to the drawer.
                    </div>
                  </div>
                </div>
              </b-col>
              <b-col md="4">
                <br>
                <div id="preview-bar">
                  <div class="barPreview pl-3 pt-3 pr-3 pb-0">
                    <div v-for="(item, index) in primaryItems" :key="item.configuration.label">
                        <div class="previewHolder mb-3">
                          <PreviewItem :item="item" />
                          <b-icon-trash @click="buttonToRemove(index)" class="overlay icon-delete p-1 bg-light rounded text-primary"></b-icon-trash>
                        </div>
                      </div>
                    <b-button @click="addToBarOrDrawer(true)" v-if="addToBar" variant="success" size="sm" class="btn-block">Add to Bar</b-button>
                    <p v-else>
                      Click on the buttons on the left to add them to the bar.
                    </p>
                    <div class="logoHolder text-center mt-5 m-3">
                      <b-img src="/img/logo-color.svg" />
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="text-right">
            <br>
            <b-button to="/dashboard" variant="outline-secondary">Cancel</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style lang="scss">
  $primary-color: #002957;

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
    .icon-delete {
      right: 10px;
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
    li.active {
      background: white;
      border-top: 1px solid $primary-color;
      border-bottom: 1px solid $primary-color;
    }
  }
</style>

<script>

import EditorPreviewDrawer from '@/components/dashboard/EditorPreviewDrawer'
import PreviewItem from '@/components/dashboard/PreviewItem'
import { availableItems, colors, icons } from '@/utils/constants'

export default {
  name: 'MemberInvite',
  methods: {
    predefinedClicked: function(index) {
      this.clearPredefinedActive()
      this.buttonStorage = this.predefinedButtons[index]
      this.predefinedButtons[index].isActive = true
      
      if (this.getPrimaryButtonsCount() < this.preview.bar.h) {
        this.addToBar = true
      }
      if (this.getDrawerButtonsCount() < (this.preview.drawer.w * this.preview.drawer.h)) {
        this.addToDrawer = true
      }
    },
    clearPredefinedActive: function() {
      for (let i = 0; i < this.predefinedButtons.length; i++) {
        this.predefinedButtons[i].isActive = false
      }
    },
    addToBarOrDrawer: function(is_primary) {
      this.clearPredefinedActive()
      if (this.buttonStorage) {
        this.buttonStorage.is_primary = is_primary
        this.bar.items.push(this.buttonStorage)
        this.buttonStorage = {}
      }
      this.addToBar = false
      this.addToDrawer = false
    },
    buttonToRemove: function(index) {
      this.bar.items.splice(index, 1)
    },
    getMembersCount: function() {
      if (this.bar.members && this.bar.members.length > 0) {
        return this.bar.members.length
      }
      return 0
    },
    getPrimaryButtonsCount: function() {
      return this.primaryItems.length;
    },
    getDrawerButtonsCount: function() {
      return this.drawerItems.length;
    }
  },
  components: {
    EditorPreviewDrawer,
    PreviewItem
  },
  computed: {
    primaryItems: function() {
      let data = [];
      if (this.bar.items && this.bar.items.length > 0) {
        for (let i = 0; i < this.bar.items.length; i++) {
          if (this.bar.items[i].is_primary === true) {
            data.push(this.bar.items[i])
          }
        }
      }
      return data
    },
    drawerItems: function() {
      let data = [];
      if (this.bar.items && this.bar.items.length > 0) {
        for (let i = 0; i < this.bar.items.length; i++) {
          if (this.bar.items[i].is_primary === false) {
            data.push(this.bar.items[i])
          }
        }
      }
      return data
    }
  },
  data() {
    return {
      addToBar: false,
      addToDrawer: false,
      buttonStorage: {},
      preview: {
        drawer: {
          w: 2,
          h: 5
        },
        bar: {
          h: 6
        }
      },
      memberData: {
        id: 1,
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@gmail.com",
        joined: "06/01/2020"
      },
      bar: {
        id: 1,
        name: "My First Bar",
        is_shared: false,
        items: [],
        members: [
          {
            id: 1,
            first_name: "John",
            last_name: "Smith"
          },
          {
            id: 2,
            first_name: "Jane",
            last_name: "Adams"
          }
        ],
        settings: {
          barOnRight: true,
          cannotClose: false,
          startsOpen: false
        }
      },
      predefinedButtons: availableItems,
      colors: colors,
      icons: icons,
      makeButtonList: [
        {
          label: "Button to start a call...",
          icon: "chat"
        },
        {
          label: "Button to join a meeting...",
          icon: "people-fill"
        },
        {
          label: "Button to open online photo album...",
          icon: "images"
        },
        {
          label: "Button to open calendar...",
          icon: "calendar3"
        },
        {
          label: "Button to open web page...",
          icon: "link"
        },
        {
          label: "Button to open an app...",
          icon: "app"
        },
        {
          label: "Button to make all distractions go away...",
          icon: "headphones"
        },
      ]
    }
  }
}
</script>