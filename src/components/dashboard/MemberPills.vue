<template>
  <div class="memberPills p-2 mb-2">
    <div v-if="members && members.length > 0">
      <b-button v-for="member in members" :to="'/dashboard/member/' + member.id" pill variant="outline-dark" class="mr-1 mb-1">
        <b-icon-person-fill></b-icon-person-fill>
        {{ member.name }}
        <b class="small text-primary">({{ member.status }})</b>
      </b-button>
    </div>
    <div v-else>
      You don't have any members attached to this Morphic Bar.
    </div>
  </div>
</template>

<script>

export default {
  name: 'MemberPills',
  props: {
    members: Array,
    default: function () {
      return []
    }
  },
  data() {
    return {
      showMembers: true
    }
  }
}
</script>