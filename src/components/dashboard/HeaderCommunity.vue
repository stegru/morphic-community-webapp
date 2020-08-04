<template>
  <div class="bg-light rounded p-3">
    <b-row>
      <b-col md="7">
        <b>{{ community.name }}</b><br>
        <!-- <b-link :href="'https://' + community.name + '.morphic-community.com/'">{{ community.name }}.morphic-community.com</b-link> -->
      </b-col>
      <b-col md="5">
        <b-row>
          <b-col md="6">
            <b>{{ community.plan }}</b> Plan
          </b-col>
          <b-col md="6">
            <div class="text-right small">
              <b>{{ members }}</b> / {{ maxMembers }} members
            </div>
          </b-col>
        </b-row>
        <b-progress :value="members" :max="maxMembers" variant="success" striped></b-progress>
      </b-col>
      <!--
      <b-col md="1">
        <div class="text-right mt-2">
          <b-button to="/my-community" variant="primary" size="sm">Manage</b-button>
        </div>
      </b-col>
      -->
    </b-row>
  </div>
</template>

<script>
import { getCommunityMembers } from '@/services/communityService'

export default {
  name: 'HeaderCommunity',
  props: {
    community: Object
  },
  data () {
    return {
      maxMembers: 25,
      members: null
    }
  },
  computed: {
    userId: function () { return this.$store.getters.userId },
    communityId: function () { return this.$store.getters.communityId }
  },
  mounted () {
    if (this.communityId) {
      this.communityMembersLength(this.communityId)
    } else {
      this.$store.dispatch('userCommunities', this.userId)
        .then((communities) => {
          this.communityMembersLength(communities[0].id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  methods: {
    communityMembersLength: function (communityId) {
      getCommunityMembers(communityId)
        .then(resp => {
          this.members = resp.data.members.length - 1
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
