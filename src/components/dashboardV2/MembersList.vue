<template>
  <div id="MembersList">
    <!-- Actually, the CM counts as a member of the Community, so by default there's always one member -->
    <ul v-if="orderedMembers.length > 1" class="list-unstyled">
      <li v-for="(member, index) in orderedMembers" :key="member.id" :class="{ active: member.id === activeMemberId }">
        <b-link v-if="member.bar_id" :to="{ name: 'MorphicBar Editor', query: { barId: member.bar_id, memberId: member.id } }" :ref="'member' + index">
          <b v-if="member.bar_id === activeBarId">{{ member.first_name }} {{ member.last_name }}</b>
          <span v-else>{{ member.first_name }} {{ member.last_name }}</span>
          <span v-if="isCommunityBar(member.bar_id)">*&nbsp;</span>
          <b-icon v-if="member.state === 'uninvited'" icon="exclamation-circle-fill" variant="dark"></b-icon>
          <br>
        </b-link>
        <div v-if="member.id === activeMemberId">
          <div v-if="member.state === 'uninvited'" class="small pb-2">
            Uninvited, you can send him invitation<br>
            <b-button size="sm" variant="light" class="btn-block">Send Invitation</b-button>
          </div>
          <div v-else-if="member.state === 'invited'" class="small pb-2">
            Invited, but has not accepted the invitation yet<br>
            <b-button size="sm" variant="light" class="btn-block">Resend Invitation</b-button>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>
      <i>Nobody in the community</i><br>
      Click the plus button to <b>add</b> somebody
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
          color: white;
          a {
            color: white;
          }
        }
        a {
          display: inline;
          padding: 0 0.75rem 0 0;
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
    activeMemberId: String,
    bars: Array,
    activeBarId: String
  },
  computed: {
    orderedMembers: function () {
      const alphabetical = this.members
      alphabetical.sort((a, b) => (a.first_name < b.first_name) ? 1 : ((a.first_name > b.first_name) ? -1 : 0))
      alphabetical.reverse()
      return alphabetical
    }
  },
  methods: {
    isCommunityBar: function (barId) {
      for (let i = 0; i < this.bars.length; i++) {
        if (this.bars[i].id === barId) {
          return this.bars[i].is_shared
        }
      }
      return false
    }
  }
}
</script>
