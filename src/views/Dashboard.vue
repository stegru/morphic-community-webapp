<template>
  <div>
    <HeaderCommunity v-if="community.id" :community="community" :key="community.id" class="mb-3" />
    <div id="morphicBarList" v-if="list.length > 0">
      <b-modal id="copyConfirm" @ok="duplicateBar" title="Copy the Bar" footer-bg-variant="light" ok-title="Copy">
        <p class="my-4">Please confirm the copying of the bar?</p>
      </b-modal>
      <b-row>
        <b-col :md="leftColumnSize">
          <h4>Your Community</h4>
        </b-col>
        <b-col :md="rightColumnSize">
          <h4>Customized Morphic Bars</h4>
        </b-col>
      </b-row>
      <div class="morphicBarItem mb-3" v-for="bar in list" :key="bar.id">
        <b-row>
          <b-col :md="leftColumnSize">
            <div class="bg-light rounded p-3 fill-height">
              <div v-if="isFirstBar()">
                <BlockFirstMember />
              </div>
              <div v-else>
                <MemberPills :bar="bar" />
              </div>
            </div>
          </b-col>
          <b-col :md="rightColumnSize">
            <MorphicBarListItem :bar="bar" @open-modal="openModal" />
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
    <div v-else id="welcome">
      <div class="text-center pt-5 pb-5 bg-silver rounded">
        <b-spinner variant="success" label="..."></b-spinner><br><br>
        Loading data, please wait...
      </div>
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
import { getCommunityBars, getCommunity, createCommunityBar, getCommunityMembers } from '@/services/communityService'

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
  data () {
    return {
      list: [],
      community: {},
      leftColumnSize: 4, // members column
      rightColumnSize: 8, // bar's column
      members: []
    }
  },
  computed: {
    userId: function () { return this.$store.getters.userId },
    communityId: function () { return this.$store.getters.communityId }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    openModal: function (bar) {
      this.barToCopy = bar
      this.$bvModal.show('copyConfirm')
    },
    duplicateBar: function () {
      const newBar = {
        name: `${this.barToCopy.name} - copy`,
        is_shared: this.barToCopy.is_shared,
        items: this.barToCopy.items
      }
      createCommunityBar(this.communityId, newBar)
        .then(resp => {
          if (resp.status === 200) {
            this.loadData()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadData: function () {
      return new Promise((resolve, reject) => {
        if (!this.$route.params.community && !this.communityId) {
          this.$store.dispatch('userCommunities', this.userId)
            .then((communities) => {
              this.community = communities[0]
              this.loadBars()
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        } else if (this.$route.params.community) {
          this.community = this.$route.params.community
          this.$store.dispatch('activeCommunity', this.community.id)
            .then(() => {
              this.loadBars()
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        } else {
          getCommunity(this.communityId)
            .then((community) => {
              this.community = community.data
              this.loadBars()
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        }
      })
    },
    loadBars: function () {
      getCommunityBars(this.community.id)
        .then(resp => {
          const bars = resp.data.bars
          getCommunityMembers(this.communityId)
            .then((resp) => {
              this.list = this.autoHideDetails(bars, true)
              this.members = resp.data.members
              if (this.members.length > 0 && this.list.length > 0) {
                for (let i = 0; i < this.list.length; i++) {
                  this.list[i].members = []
                  for (let j = 0; j < this.members.length; j++) {
                    if (this.list[i].id === this.members[j].bar_id) {
                      this.list[i].members.push(this.members[j])
                    }
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
    isFirstBar: function () {
      if (this.list.length === 1) {
        if (this.list[0].members && this.list[0].members.length > 0) {
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
    },
    autoHideDetails: function (data, showFirstOne) {
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
    }
  }
}
</script>
