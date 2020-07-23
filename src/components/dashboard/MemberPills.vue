<template>
  <div id="memberList">
    <ul v-if="members && members.length > 0" class="list-unstyled mb-0">
      <li v-for="member in members" :key="member.id">
        <RenderMember v-if="member.bar_id === bar.id" :member="member" />
      </li>
    </ul>
    <div v-else>
      You don't have any members attached to this Morphic Bar.
    </div>
  </div>
</template>

<script>
import { getCommunityMembers } from '@/services/communityService'

import RenderMember from '@/components/dashboard/RenderMember'

export default {
  name: 'MemberPills',
  components: {
    RenderMember
  },
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
    getCommunityMembers(this.communityId)
      .then(resp => {
        this.members = resp.data.members
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
