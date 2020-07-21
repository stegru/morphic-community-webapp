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
      <div class="morphicBarItem mb-3" v-for="bar in list" :key="bar.id">
        <b-row>
          <b-col md="5">
            <div class="bg-light rounded p-3">
              <div v-if="isFirstBar()">
                <BlockFirstMember />
              </div>
              <div v-else>
                <h4>Your Community</h4>
                <MemberPills :bar=bar />
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
  </div>
</template>

<script>

import BlockWelcome from '@/components/dashboard/BlockWelcome'
import BlockPredefinedOrNew from '@/components/dashboard/BlockPredefinedOrNew'
import BlockFirstMember from '@/components/dashboard/BlockFirstMember'
import MemberPills from '@/components/dashboard/MemberPills'
import MorphicBarListItem from '@/components/dashboard/MorphicBarListItem'
import { getUserCommunities, getCommunityBars } from '@/services/communityService'

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
    isFirstBar: function () {
      if (this.list.length === 1) {
        if (this.list[0].members) {
          return false
        } else {
          return true
        }
      }
      return false
    },
    isListEmpty: function () {
      if (this.list.length > 0) {
        return false
      }
      return true
    }
  },
  data () {
    return {
      // main rendering list
      list: [],
      communityId: '',
      welcomeOrPickBar: true // if we are on the welcome page show the welcome text first
    }
  },
  computed: {
    userId: function () { return this.$store.getters.userId }
  },
  mounted () {
    this.$store.dispatch('userCommunities', this.userId)
      .then((communities) => {
        this.communityId = communities[0].id
        getCommunityBars(this.communityId)
          .then(resp => {
            this.list = resp.data.bars
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
