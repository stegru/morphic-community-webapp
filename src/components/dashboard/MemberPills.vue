<template>
  <div id="memberList">
    <ul v-if="bar.members && bar.members.length > 0" class="list-unstyled mb-0">
      <li v-for="member in bar.members" :key="member.id">
        <RenderMember :member="member" />
      </li>
    </ul>
    <div v-else>
      You don't have any members attached to this Morphic Bar.
    </div>
  </div>
</template>

<script>
import RenderMember from '@/components/dashboard/RenderMember'

export default {
  name: 'MemberPills',
  components: {
    RenderMember
  },
  props: {
    bar: Object
  }
}
</script>
