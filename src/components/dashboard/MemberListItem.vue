<template>
  <div class="MemberListItem">
    <b-row>
      <b-col md="3">
        <b>
          <b-icon-person-fill></b-icon-person-fill>
          {{ member.name }}
        </b>
      </b-col>
      <b-col md="3">
        <div v-if="member.bar.id > 0">
          <div v-if="member.bar.status == 'applied'">
            <div v-if="member.bar.shared">
              <b-icon-people-fill></b-icon-people-fill>
              Shared Bar
            </div>
            <div v-else>
              <b-icon-people></b-icon-people>
              Personalized Bar
            </div>
          </div>
          <div v-else>
            <b-icon-exclamation-circle-fill></b-icon-exclamation-circle-fill>
            Bar is not curent
          </div>
        </div>
        <div v-else>
          <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
          No Morphic Bar
        </div>
      </b-col>
      <b-col md="6">
        <div v-if="member.status == 'accepted'">
          <!-- everything is alright -->
        </div>
        <div v-else-if="member.status == 'invited'">
          <b-icon-clock></b-icon-clock>
          Has not accepted invitation yet
        </div>
        <div v-else>
          <b-icon-exclamation-circle-fill></b-icon-exclamation-circle-fill>
          Not Invited Yet
        </div>
      </b-col>
    </b-row>
    <div class="section" :class="{ 'collapsed': !member.listActive }">
      <b-row class="rowButtons mt-2">
        <b-col md="3">
          <b-button :to="'/dashboard/member/' + member.id" variant="light" size="sm">User Details</b-button>
        </b-col>
        <b-col md="3">
          <div v-if="!member.bar.id">
            <b-button to="/dashboard/morphicbar-preconfigured" variant="light" size="sm">Pick a Morphic Bar</b-button>
          </div>
        </b-col>
        <b-col md="6">
          <div v-if="member.status == 'accepted'">
            <!-- everything is alright -->
          </div>
          <div v-else-if="member.status == 'invited'">
            <b-button variant="light" size="sm">Resend Invitation</b-button>
            <i class="small">&nbsp;Last invitation sent 10 days ago</i>
          </div>
          <div v-else>
            <b-button variant="light" size="sm">Send Invitation</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row class="rowPreviews mt-3">
        <b-col md="3">
        </b-col>
        <b-col md="9">
          <b-row>
            <b-col md="4">
              <h6><b>Morphic Bar</b></h6>
              <MorphicBarPreview :options=member.bar.options />
            </b-col>
            <b-col md="8">
              <h6><b>Morphic Launch</b></h6>
              <MorphicLaunchPreview :options=member.bar.extra />
            </b-col>
          </b-row>
          <b-button-group class="mt-2" size="sm">
            <b-button variant="light">Preview Bar</b-button>
            <b-button variant="light">Edit Bar</b-button>
            <b-button variant="light">Make a copy</b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style>
  .section {
    height: auto;
    max-height: 1000px;
    transition: max-height 0.3s ease-out;
  }
  .section.collapsed {
    max-height: 0px;
    overflow: hidden;
  }
</style>

<script>
import MorphicBarPreview from '@/components/dashboard/MorphicBarPreview'
import MorphicLaunchPreview from '@/components/dashboard/MorphicLaunchPreview'

export default {
  name: 'MorphicBarListItem',
  props: {
    member: Object,
    default: function () {
      return { }
    }
  },
  components: {
    MorphicBarPreview,
    MorphicLaunchPreview
  }
}
</script>
