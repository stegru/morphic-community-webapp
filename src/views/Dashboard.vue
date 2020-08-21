<template>
  <div>
    <!-- MODALs: BEGIN -->
    <b-modal id="copyConfirm" @ok="duplicateBar" title="Copy the Bar" footer-bg-variant="light" ok-title="Copy">
      <p class="my-4">Please confirm the copying of the bar?</p>
    </b-modal>
    <b-modal id="previewModal" @ok="clearPreviewData" title="Bar Preview" footer-bg-variant="light" size="lg">
      <p class="mb-3">This the bar and the drawer should look like when opened.</p>
      <b-row>
        <b-col md="8">
          <DrawerPreview :barId="barPreviewData.id" />
        </b-col>
        <b-col md="4">
          <BarPreview :barId="barPreviewData.id" />
        </b-col>
      </b-row>
    </b-modal>
    <!-- MODALs: END -->

    <!-- Dashboard v2 -->
    <b-row>
      <b-col md="2">
        <CommunityManager :community="community" :bars="list" :members="members" />
      </b-col>
      <b-col md="8">
        <div v-if="list.length > 0 && members.length > 1" class="info-box pt-5 pb-5">
          <!-- FULL DASHBOARD -->
          <b-row>
            <b-col md="7">
              <p>The green menu on the left lists your community bars and the people in your community.</p>
              <p>Here are some things you can do...</p>

              <h5>Invite people to your community</h5>
              <p>Make a community! Add people to your community so they can use Morphic Bar, which you can personalize.</p>
              <p class="text-success">To invite a person, find the word "People" in the green menu to the left and click on the green (+) button.</p>

              <br>

              <h5>Personalize a bar</h5>
              <p>You can personalize a bar to fit needs of a person.</p>
              <p class="text-success">To personalize a Bar, click their name or email in the green menu on the left.</p>

              <br>

              <h5>Edit a community bar</h5>
              <p>Do you have a bar that you think several people in your community might want to use?</p>
              <p class="text-success">To customize a community bar, click the name of a bar in the green menu on the left.</p>
            </b-col>
            <b-col md="5">
              <h4>Status</h4>
              <div v-if="membersNotInvited.length > 0">
                <p class="mb-0"><b>{{ membersNotInvited.length }} user(s)</b> never got the invitation email:</p>
                <ul>
                  <li v-for="member in membersNotInvited" :key="member.id">
                    {{ member.first_name }} {{ member.last_name }}
                  </li>
                </ul>
              </div>
              <div v-if="membersNotAccepted.length > 0">
                <p class="mb-0"><b>{{ membersNotAccepted.length }} user(s)</b> that have not accepted their invitation:</p>
                <ul>
                  <li v-for="member in membersNotAccepted" :key="member.id">
                    {{ member.first_name }} {{ member.last_name }}
                  </li>
                </ul>
              </div>
              <p v-if="membersNotInvited.length > 0 || membersNotAccepted.length > 0">
                Click on their names on the left to send the invitation.
              </p>
            </b-col>
          </b-row>
        </div>
        <div v-else-if="list.length > 0 && members.length !== 0" class="info-box pt-3 pb-3">
          <!-- NO MEMBERS DASHBOARD (only the default bar) -->
          <b-row>
            <b-col md="5">
              <h5><b>Welcome to Morpic</b></h5>
              <p>Here are some steps you can take to get started.</p>
              <h5>Invite people to your community</h5>
              <p>Make a community! Add people to your community so they can use Morphic Bar, which you can personalize.</p>
              <p class="text-success">To invite a person, find the word "People" in the green menu to the left and click on the green (+) button.</p>
              <br>

              <h5>(Optional) Customize your Morphic Starter Bar</h5>
              <p>People who join will see your community's Starter Bar (shown on this page). You can customize the Starter Bar to meet your community's needs.</p>
              <p class="text-success">To customize your Starter Bar, click "Starter Bar" in the green menu on the left.</p>
            </b-col>
            <b-col md="7">
              <div v-if="list[0]" class="desktop">
                <div class="taskbarMac"></div>
                <b-row>
                  <b-col md="6">
                    <div class="desktopHolder text-center mt-3">
                      <img src="/img/logo-color.svg" alt="icon" class="iconMorphic"><br>
                      <p>Open Morphic</p>
                    </div>
                  </b-col>
                  <b-col md="6">
                    <BarPreview :barId="list[0].id" />
                  </b-col>
                </b-row>
                <div class="taskbarWindows"></div>
              </div>
            </b-col>
          </b-row>
        </div>
        <div v-else id="welcome">
          <div class="text-center pt-5 pb-5 bg-silver rounded">
            <b-spinner variant="success" label="..."></b-spinner><br><br>
            Loading data, please wait...
          </div>
        </div>
      </b-col>
      <b-col md="1">
        <div class="fill-height bg-silver"></div>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
  $primary-color: #002957;
  $secondary-color: #84c661;

  .info-box {
    h5 {
      color: $primary-color;
    }
  }
</style>

<script>

import BarPreview from '@/components/dashboard/BarPreview'
import DrawerPreview from '@/components/dashboard/DrawerPreview'
import CommunityManager from '@/components/dashboardV2/CommunityManager'
import { getCommunityBars, getCommunity, createCommunityBar, getCommunityMembers } from '@/services/communityService'

export default {
  name: 'Dashboard',
  components: {
    BarPreview,
    DrawerPreview,
    CommunityManager
  },
  data () {
    return {
      // data
      list: [],
      community: {},
      members: [],
      barPreviewData: {}
    }
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
    openModal: function (bar) {
      this.barToCopy = bar
      this.$bvModal.show('copyConfirm')
    },
    showPreview: function (bar) {
      this.barPreviewData = bar
      this.$bvModal.show('previewModal')
    },
    clearPreviewData: function (bar) {
      this.barPreviewData = {}
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
