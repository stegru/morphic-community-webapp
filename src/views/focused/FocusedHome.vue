<template>
<html>
  <h1>Your Morphic Community: {{ community.name }} </h1>
  <ul>
    <!-- <li><a >Community Settings</a></li>
    <li><a >Add a community</a></li>
    <li><a >Switch to a different community</a></li> -->
    <li><a href="#" @click="logout">Sign out </a></li>
  </ul>

  <h2>Community Bars</h2>
    <ul v-if="list.length > 0" class="list-unstyled">
      <li v-for="bar in list" :key="bar.id" >
        <b-link :to="{ name: 'Focused: Bar Editor', query: { barId: bar.id } }">
         {{ bar.name === "Default" ? "Default Bar" : bar.name }}
        </b-link>
      </li>
    </ul>
    <p v-else>
      <i>No bars in the community</i><br>
      Click on the plus button just above to add your first one
    </p>
  <a href="#">Add a community bar</a>

  <h2>People in your community</h2>
  <em>Follow a link to see or change the member's Morphic Bar</em>

  <a >Add a Member</a>
  <ul v-if="members.length > 0" class="list-unstyled">
      <li v-for="member in members" :key="member.id" >
        <b-link v-if="member.bar_id" :to="{ name: 'Focused: Bar Editor', query: { barId: member.bar_id, memberId: member.id } }">
          {{ member.first_name }} {{ member.last_name }}
          <b-icon v-if="member.state === 'uninvited'" icon="exclamation-circle-fill" variant="dark"></b-icon>
          <br>
        </b-link>
      </li>
    </ul>
    <p v-else>
      <i>Nobody in the community</i><br>
      Click on the plus button just above to add somebody to your community
    </p>

  <b-link :to="{ name: 'Focused: Button Catalog' }">
    View the catalog of buttons available for the Morphic Bar
  </b-link>

</html>
</template>

<style>

</style>

<script>
import BarPreview from '@/components/dashboard/BarPreview'
import DrawerPreview from '@/components/dashboard/DrawerPreview'
import CommunityManager from '@/components/dashboardV2/CommunityManager'
import { getCommunityBars, getCommunity, createCommunityBar, getCommunityMembers } from '@/services/communityService'


export default {
  name: 'FocusedHome',
  components: {
    BarPreview,
    DrawerPreview,
    CommunityManager
  },
  data () {
    return {
      list: [],
      bars: [],
      community: {},
      members: [],
      barPreviewData: {}
    };
  },
  computed: {
    userId: function () { return this.$store.getters.userId },
    communityId: function () { return this.$store.getters.communityId },
    membersNotInvited: function() {
      let list = []
      for (let i = 0; i < this.members.length; i++) {
        if (this.members[i].state === 'uninvited') {
          list.push(this.members[i])
        }
      }
      return list
    },
    membersNotAccepted: function() {
      let list = []
      for (let i = 0; i < this.members.length; i++) {
        if (this.members[i].state === 'invited') {
          list.push(this.members[i])
        }
      }
      return list
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    logout: function () {
      if (this.disableLogout) {
        window.confirm(MESSAGES.logoutAlert)
      } else {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/')
          })
      }
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
              console.err(err)
            })
        })
        .catch(err => {
          console.err(err)
        })
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
    },
    orderedMembers: function () {
      const alphabetical = this.members
      alphabetical.sort((a, b) => (a.first_name < b.first_name) ? 1 : ((a.first_name > b.first_name) ? -1 : 0))
      alphabetical.reverse()
      return alphabetical
    }
  }

}
</script>
