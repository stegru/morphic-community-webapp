<template>
  <div>
    <HeaderCommunity :community="community" class="mb-3" />
    <div id="welcome" v-if="list.length === 0">
      <b-row>
        <b-col :md="leftColumnSize">
          <div class="bg-light rounded p-3 fill-height">
          </div>
        </b-col>
        <b-col :md="rightColumnSize">
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
      <b-row>
        <b-col :md="leftColumnSize">
          <h4>Your Community</h4>
        </b-col>
        <b-col :md="rightColumnSize">
          <h4>Customized Morphic Bars</h4>
        </b-col>
      </b-row>
      <div class="morphicBarItem mb-3" v-for="bar in list">
        <b-row>
          <b-col :md="leftColumnSize">
            <div class="bg-light rounded p-3 fill-height">
              <div v-if="isFirstBar()">
                <BlockFirstMember />
              </div>
              <div v-else>
                <MemberPills :members=bar.members />
              </div>
            </div>
          </b-col>
          <b-col :md="rightColumnSize">
            <MorphicBarListItem :bar=bar />
          </b-col>
        </b-row>
      </div>
      <div id="listButtons" v-if="isFirstBar() === false">
        <b-row>
          <b-col :md="leftColumnSize">
            <div class="bg-light rounded p-3">
              <b-button to="/dashboard/member-invite" variant="primary" class="btn-block ml-1">Invite New Member</b-button>
            </div>
          </b-col>
          <b-col :md="rightColumnSize">
            <div class="bg-silver rounded p-3 text-right">
              <b-button to="/dashboard/morphicbar-preconfigured" variant="primary" class="btn-block">Pick or Make a new Morphic Bar</b-button>
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

import HeaderCommunity from '@/components/dashboard/HeaderCommunity'
import BlockWelcome from '@/components/dashboard/BlockWelcome'
import BlockPredefinedOrNew from '@/components/dashboard/BlockPredefinedOrNew'
import BlockFirstMember from '@/components/dashboard/BlockFirstMember'
import MemberPills from '@/components/dashboard/MemberPills'
import MorphicBarListItem from '@/components/dashboard/MorphicBarListItem'

import { availableItems } from '@/utils/constants'

export default {
  name: 'Dashboard',
  components: {
    HeaderCommunity,
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
    autoHideDetails: function(data, showFirstOne) {
      if (data && data.length > 0) {
        for (var i = data.length - 1; i >= 0; i--) {
          if (showFirstOne && i === 0) {
            data[i].showDetails = true
          } else {
            data[i].showDetails = false
          }
        }
      }
      return data
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
      leftColumnSize: 4, // members column
      rightColumnSize: 8, // bar's column
      welcomeOrPickBar: true, // if we are on the welcome page show the welcome text first
      availableItems: availableItems,
      community: {
        name: "My Community",
        url: "my-community",
        plan: "Silver",
        nextPaymentDate: "9/20/2020",
        members: 3,
        maxMembers: 10
      }
    }
  },
  computed: {
    // predefined list with one bar without members
    listWithBar() {
      let data = [
        {
          id: 1,
          name: "My First MorphicBar",
          is_shared: false,
          items: this.availableItems
        }
      ]
      return this.autoHideDetails(data, true)
    },
    // predefined fully filled bar list with members and such
    listFull() {
      let data = [
        {
          id: 1,
          name: "My First MorphicBar",
          is_shared: false,
          items: this.availableItems,
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
          is_shared: false,
          items: this.availableItems,
          members: []
        },
        {
          id: 3,
          name: "Basic MorphicBar",
          is_shared: true,
          items: this.availableItems,
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
      return this.autoHideDetails(data, true)
    }
  }
}  
</script>
