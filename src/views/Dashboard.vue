<template>
  <div>
    <div id="welcome" v-if="list.length === 0">
      <b-row>
        <b-col md="12">
          <div class="bg-silver rounded p-3">
            <b-img src="/img/dashboard-intro.jpg" fluid rounded alt="Dashboard Intro Image"></b-img>
            <div id="welcome-text" v-if="welcomeOrPickBar">
              <BlockWelcome />
              <p class="text-center mt-5">
                <b-button @click="welcomeOrPickBar = false" variant="primary" size="lg">Get started with custom Morphic Bar</b-button>
              </p>
            </div>
            <div id="welcome-pick" v-if="welcomeOrPickBar === false">
              <BlockPredefinedOrNew />
              <p class="text-center mt-5">
                <b-button to="/dashboard/morphicbar-editor/0" variant="primary">I want to make my own</b-button>
                <b-button to="/dashboard/morphicbar-preconfigured" variant="success" class="ml-1">Let me look at several options first</b-button>
                <b-button @click="welcomeOrPickBar = true" variant="outline-secondary" class="ml-1">Cancel</b-button>
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div id="morphicBarList" v-if="list.length > 0">
      <div class="morphicBarItem mb-3" v-for="bar in list">
        <b-row>
          <b-col md="5">
            <div class="bg-light rounded p-3">
              <div v-if="isFirstBar()">
                <BlockFirstMember />
              </div>
              <div v-else>
                <h4>Your Community</h4>
                <MemberPills :members=bar.members />
              </div>
            </div>
          </b-col>
          <b-col md="7">
            <div class="bg-silver rounded p-3">
              <h4>Customized Morphic Bars</h4>
              <MorphicBarListItem :bar=bar />
            </div>
          </b-col>
        </b-row>
      </div>
      <div id="listButtons" v-if="isFirstBar() === false">
        <b-row>
          <b-col md="5">
            <div class="bg-light rounded p-3">
              <b-button to="/dashboard/member-invite" variant="primary" class="ml-1">Invite New Member</b-button>
            </div>
          </b-col>
          <b-col md="7">
            <div class="bg-silver rounded p-3 text-right">
              <b-button to="/dashboard/morphicbar-preconfigured" variant="primary">Pick or Make a new Morphic Bar</b-button>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <div>
      <b class="text-danger small">DEBUG:</b><br>
      <b-button @click="debugDashboardEmpty()" variant="primary" size="sm">Empty Dashboard</b-button>
      <b-button @click="debugDashboardWithBar()" variant="primary" size="sm" class="ml-1">MorphicBar Added</b-button>
      <b-button @click="debugDashboardFull()" variant="primary" size="sm" class="ml-1">Full Dashboard</b-button>
    </div>
  </div>
</template>

<script>

import BlockWelcome from '@/components/dashboard/BlockWelcome'
import BlockPredefinedOrNew from '@/components/dashboard/BlockPredefinedOrNew'
import BlockFirstMember from '@/components/dashboard/BlockFirstMember'
import MemberPills from '@/components/dashboard/MemberPills'
import MorphicBarListItem from '@/components/dashboard/MorphicBarListItem'

export default {
  name: 'Dashboard',
  components: {
    BlockWelcome,
    BlockPredefinedOrNew,
    BlockFirstMember,
    MemberPills,
    MorphicBarListItem
  },
  methods: {
    isFirstBar: function() {
      if (this.list.length === 1) {
        if (this.list[0].members) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    },
    isListEmpty: function() {
      if (this.list.length > 0) {
        return false;
      }
      return true;
    },

    // DEBUG methods (to change the different lists)
    debugDashboardEmpty: function() {
      this.list = [];
    },
    debugDashboardWithBar: function() {
      this.list = this.listWithBar;
    },
    debugDashboardFull: function() {
      this.list = this.listFull;
    }
  },
  data() {
    return {
      // main rendering list
      list: [],
      welcomeOrPickBar: true, // if we are on the welcome page show the welcome text first

      // predefined list with one bar without members
      listWithBar: [
        {
          id: 1,
          name: "My First MorphicBar",
          options: ["Text Zoom", "Magnifier", "Read Aloud", "Sound Volume", "High Contrast"],
        }
      ],
      // predefined fully filled bar list with members and such
      listFull: [
        {
          id: 1,
          name: "My First MorphicBar",
          options: ["Text Zoom", "Magnifier", "Read Aloud", "Sound Volume", "High Contrast"],
          members: [
            {
              id: 1,
              name: "John Smith",
              status: "invited"
            },
            {
              id: 2,
              name: "Karoline",
              status: "invited"
            },
            {
              id: 3,
              name: "Dan McDan",
              status: "accepted"
            }
          ]
        },
        {
          id: 2,
          name: "My Second MorphicBar",
          options: ["Magnifier", "Text Zoom", "High Contrast", "Read Aloud", "Sound Volume"],
          members: []
        },
        {
          id: 3,
          name: "My Third MorphicBar",
          options: ["High Contrast", "Text Zoom", "Read Aloud", "Sound Volume", "Magnifier"],
          members: [
            {
              id: 4,
              name: "Jody La Forge",
              status: "accepted"
            },
            {
              id: 5,
              name: "Cp. Kirk",
              status: "accepted"
            }
          ]
        }
      ]
    }
  }
}  
</script>
