<template>
  <div id="MembersList">
    <ul v-if="members.length > 0" class="list-unstyled">
      <li v-for="member in members" :key="member.id" :class="{ active: member.id === activeMemberId }">
        <b-link :to="'/dashboard/member/' + member.id">
          {{ member.first_name }} {{ member.last_name }}
        </b-link>
      </li>
    </ul>
    <p v-else>
      <i>Nobody in the community</i><br>
      Click on the plus button just above to add somebody to your community
    </p>
  </div>
</template>

<style lang="scss">
  #MembersList {
    ul {
      margin: 0 -1rem 1rem -1rem;
      li {
        padding: 0 1rem;
        &.active {
          padding: .25rem 1rem;
          background: green;
          a {
            color: white;
          }
        }
      }
    }
  }
</style>

<script>

export default {
  name: 'MembersList',
  props: {
    members: Array,
    activeMemberId: String
  }
}
</script>
