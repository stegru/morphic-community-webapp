<template>
  <div>
    <h4>Morphic Bar Editor</h4>
    <div class="bg-silver rounded p-3">
      <b-row>
        <b-col md="3">
          <b-input-group id="search-group" size="sm" class="mb-3">
            <b-form-input type="text"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary"><b-icon-search></b-icon-search></b-button>
            </b-input-group-append>
          </b-input-group>
          <h6><b>Make-a-Button</b></h6>
          <ul class="list-unstyled mb-3">
            <li v-for="button in makeButtonList" class="mb-1">
              <b-link>
                <b-icon :icon="button.icon"></b-icon>
                {{ button.label }}
              </b-link>
            </li>
          </ul>
          <h6><b>Predefined Buttons</b></h6>
          <ul class="list-unstyled mb-0">
            <li v-for="button in predefinedButtons" class="mb-1">
              <b-link>
                <b-icon icon="bootstrap"></b-icon>
                {{ button.label }}
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
              <span class="small">(<b-link>Edit Bar name</b-link>)</span>
            </h5>
          </div>
          <b-tabs content-class="bg-light p-3" small>
            <b-tab>
              <template v-slot:title>
                <b-icon-person-circle></b-icon-person-circle>
                User ({{ getMembersCount() }})
              </template>
              <div v-if="getMembersCount() === 0">
                <h4><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is NOT used</b></h4>
                <p class="mb-0">You can go back to the <b-link to="/dashboard">Dashboard</b-link> and invite members to use it.</p>
              </div>
              <div v-else-if="getMembersCount() === 1">
                <h4><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is used by only one user</b></h4>
                <p class="mb-0">
                  <b>{{ memberData.first_name }} {{ memberData.last_name }}</b><br>
                  {{ memberData.email }}<br>
                  Joined: {{ memberData.joined }}
                </p>
              </div>
              <div v-else>
                <h4><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is used by {{ getMembersCount() }} people</b></h4>
                <ul class="mb-0">
                  <li v-for="member in bar.members">
                    <b-link :to="'/dashboard/member/' + member.id">{{ member.first_name }} {{ member.last_name }}</b-link>
                  </li>
                </ul>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <b-icon-gear-fill></b-icon-gear-fill>
                Bar Settings
              </template>
              <div>
                <h4><b-icon-gear-fill></b-icon-gear-fill> <b>Morphic Bar settings</b></h4>
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
            <b-tab>
              <template v-slot:title>
                <b-icon-fullscreen></b-icon-fullscreen>
                Try it
              </template>
              <div>
                <h4><b-icon-fullscreen></b-icon-fullscreen> <b>Try this bar on your own computer</b></h4>
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
                <b>Save &amp; Update</b>
              </template>
              <div>
                <h4><b-icon-cloud-upload></b-icon-cloud-upload> <b>Save bar &amp; Update bar for all users</b></h4>
                <p>
                  Save your changes to the buttons on the bar. This will update the bar on users' computers. Sometimes a computer will need to be restarted to get the updates.
                </p>
                <b-button variant="primary">Save &amp; Update bar for the users ({{ getMembersCount() }})</b-button>
              </div>
            </b-tab>
          </b-tabs>
          <div id="preview-holder">
            <b-row>
              <b-col md="8">
                <div id="preview-drawer">
                  <EditorPreviewDrawer :settings=preview.drawer :items=fillUpDrawer() class="mt-3" />
                </div>
              </b-col>
              <b-col md="4">
                <div id="preview-bar">
                  
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import EditorPreviewDrawer from '@/components/dashboard/EditorPreviewDrawer'
import { availableItems } from '@/utils/constants'

export default {
  name: 'MemberInvite',
  methods: {
    getMembersCount: function() {
      if (this.bar.members && this.bar.members.length > 0) {
        return this.bar.members.length
      }
      return 0
    },
    fillUpDrawer: function() {
      let items = [];
      for (var i = this.preview.drawer.h - 1; i >= 0; i--) {
        for (var j = this.preview.drawer.w - 1; j >= 0; j--) {
          let item = this.emptyData
          item.active = false
          items.push(item)
        }
      }
      return items
    },
    fillUpBar: function() {
      let items = [];
      for (var i = this.preview.bar.h - 1; i >= 0; i--) {
        let item = this.emptyData
        item.active = false
        items.push(item)
      }
      return items
    }
  },
  components: {
    EditorPreviewDrawer
  },
  data() {
    return {
      preview: {
        drawer: {
          w: 3,
          h: 5
        },
        bar: {
          h: 5
        }
      },
      emptyData: {
        kind: "empty",
        label: "Click to add button here"
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