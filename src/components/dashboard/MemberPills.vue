<template>
  <div class="memberPills p-2 mb-2">
    <div v-if="members && members.length > 0">
      <b-button v-for="member in members" v-bind:key="member.id" :to="'/dashboard/member/' + member.id" pill variant="outline-dark" class="mr-1 mb-1">
        <b-icon-person-fill></b-icon-person-fill>
        {{ member.first_name }} {{ member.last_name }}
        <!-- <b class="small text-primary">({{ member.state }})</b> -->
      </b-button>
    </div>
    <div v-else>
      You don't have any members attached to this Morphic Bar.
    </div>
  </div>
</template>

<script>
import { getCommunityMembers } from '@/services/communityService'

export default {
  name: 'MemberPills',
  props: {
    bar: Object
  },
  data () {
    return {
      members: [],
      showMembers: true
    }
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId }
  },
  mounted () {
    getCommunityMembers(this.communityId, this.bar.id)
      .then(resp => {
        this.members = resp.data.members
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
