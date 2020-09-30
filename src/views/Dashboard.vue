<template>
  <div>
    <b-row>
      <b-col md="2">
        <CommunityManager :community="community" :bars="list" :members="members" ref="CommunityManager" />
      </b-col>
      <b-col md="5" fluid>
        <div v-if="members.length > 0" class="info-box pt-3 pb-3">
          <b-row>
            <b-col md="5" class="flex-column">
              <h4><b>Welcome to Morphic</b></h4>
              <!-- TODO: Update if to members.lenght > 1 -->
              <div v-if="members.length > 1">
                <p class="text-left small">
                  (<b-link @click="hintsSwitch" v-text="showHideHintsText"></b-link>)
                </p>
              </div>
              <div v-else>
                <br>
              </div>
              <br>
              <div id="hints" v-if="showHints" style="font-family: 'Coming Soon'; font-weight: 600;" >
                <!--
                <div v-if="members.length > 1">
                  <br>
                </div>
                <div v-else>
                  <br><br>
                </div>
                -->
                <div id="BarsHint" ref="BarsHint">
                  View or make changes to a bar by clicking on its name
                </div>
                <!-- Ideally we should make the position relative to the items on the left -->
                <br><br><br>
                <div id="MembersHint" ref="MembersHint">
                  <div v-if="members.length > 1">
                    Add a new member
                  </div>
                  <div v-else>
                    Add a new member to your community by clicking the Plus button<
                  </div>
                </div>
                <br>
                <div v-if="members.length > 1">
                  <p ref="EditMemberHint">See a member's bar and other detail by clicking them</p>
                  <p>If you see an exclamation <b-icon icon="exclamation-circle-fill" variant="dark"></b-icon> the member has not yet accepted your invitation</p>
                </div>
              </div>
              <div v-else>
                <p class="text-left small">Get started by clicking an item in the green menu to the left</p>
              </div>
            </b-col>
            <b-col md="7">
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
      <b-col md="4">
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

  .desktopDashboard {
    .barPreview {
      min-height: 500px;
    }
    .logoHolder {
      margin: 0 -2rem !important;
    }
  }
  .info-box {
    h5 {
      color: $primary-color;
    }
  }
</style>

<script>
import * as arrowLine from 'arrow-line'
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
      barPreviewData: {},
      showHints: true,
      showHideHintsText: "Hide hints",
      editBarArrow: {},
      addPeopleArrow: {},
      editPersonArrow: {},
      barsHintCss: {}
    }
  },
  computed: {
    userId: function () { return this.$store.getters.userId },
    communityId: function () { return this.$store.getters.communityId },
    membersNotInvited: function () {
      const list = []
      for (let i = 0; i < this.members.length; i++) {
        if (this.members[i].state === 'uninvited') {
          list.push(this.members[i])
        }
      }
      return list
    },
    membersNotAccepted: function () {
      const list = []
      for (let i = 0; i < this.members.length; i++) {
        if (this.members[i].state === 'invited') {
          list.push(this.members[i])
        }
      }
      return list
    }
  },
  mounted: function () {
    this.loadData()
    // This is required to re-draw the arrows, sorry :P
    let that = this
    this.$nextTick(function() {
      window.addEventListener("resize", function () {that.$forceUpdate()})
    }(that))
  },
  beforeDestroy: function () {
    this.cleanUpArrows()
  },
  updated () {
    this.cleanUpArrows()
    // TODO: Find a better way to detect whether the hints are displayed
    if (this.$refs.BarsHint && this.showHints) {
      this.createArrows()
    }
  },
  methods: {
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
              console.error(err)
            })
        })
        .catch(err => {
          console.error(err)
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
    hintsSwitch: function () {
      this.showHints = !this.showHints
      this.showHideHintsText = this.showHints? "Hide hints": "Show hints"
    },
    createArrows: function () {
      // BarsHint
      let barsHintRect = this.$refs.BarsHint.getBoundingClientRect()
      let firstBarRect = this.$refs.CommunityManager.$refs.BarsList.$refs.bar0[0].$el.getBoundingClientRect()

      let source0 = {
        x: barsHintRect.x - 1,
        y: barsHintRect.y + barsHintRect.height/2
      }
      let target0 = {
        x: firstBarRect.x + firstBarRect.width,
        y: firstBarRect.y + firstBarRect.height/2 + 2
      }

      this.editBarArrow = new arrowLine(source0, target0, { curvature: 0.5, forceDirection: "horizontal" })

      // MembersHint
      let membersHintRect = this.$refs.MembersHint.getBoundingClientRect()
      let AddPeopleIconRect = this.$refs.CommunityManager.$refs.AddPeopleIcon.getBoundingClientRect()

      let source1 = {
        x: membersHintRect.x - 1,
        y: membersHintRect.y + membersHintRect.height/2
      }
      let target1 = {
        x: AddPeopleIconRect.x + AddPeopleIconRect.width,
        y: AddPeopleIconRect.y + AddPeopleIconRect.height/2 + 2
      }
      this.addPeopleArrow = new arrowLine(source1, target1, { curvature: 0.5, forceDirection: "horizontal" })

      // PersonHint
      if (this.members.length > 1) {
        let firstMember = Object.values(this.$refs.CommunityManager.$refs.MembersList.$refs)[0]

        let editMemberHintRect = this.$refs.EditMemberHint.getBoundingClientRect()
        let firstMemberRect = firstMember[0].$el.getBoundingClientRect()

        let source2 = {
          x: editMemberHintRect.x - 1,
          y: editMemberHintRect.y + editMemberHintRect.height/2
        }
        let target2 = {
          x: firstMemberRect.x + firstMemberRect.width,
          y: firstMemberRect.y + firstMemberRect.height/2 + 2
        }
        this.editPersonArrow = new arrowLine(source2, target2, { curvature: 1.5, forceDirection: "horizontal" })
      }
    },
    cleanUpArrows: function () {
      if (this.addPeopleArrow.remove) {
        this.addPeopleArrow.remove()
        this.addPeopleArrow = {}
        this.editBarArrow.remove()
        this.editBarArrow = {}
        if (this.editPersonArrow.remove) {
          this.editPersonArrow.remove()
          this.editPersonArrow = {}
        }
      }
    }
  }
}
</script>
