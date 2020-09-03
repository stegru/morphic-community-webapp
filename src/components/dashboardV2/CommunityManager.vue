<template>
  <div id="CommunityManager" class="bar-people-controls fill-height bg-green p-3">
    <h4><b>{{ community.name }}</b></h4>
    <p class="text-right small">
      (<b-link disabled>Community settings</b-link>)
    </p>
    <h5>
      <b>Community Bars</b>
      <b-link to="/dashboard/morphicbar-preconfigured" class="icon-add"><b-icon-plus-circle-fill variant="success"></b-icon-plus-circle-fill></b-link>
    </h5>
    <BarsList :bars="bars" :activeBarId="activeBarId" />

    <h5>
      <b>People</b>
      <b-link to="/dashboard/member-invite" class="icon-add"><b-icon-plus-circle-fill variant="success"></b-icon-plus-circle-fill></b-link>
    </h5>
    <MembersList :members="members" :bars="bars" :activeMemberId="activeMemberId" />
  </div>
</template>

<style lang="scss">
  $primary-color: #002957;
  $secondary-color: #84c661;

  .bg-green {
    background: #a5d58a url(/img/bg-green.png) repeat-x bottom;
  }

  .bar-people-controls {
    a {
      color: $primary-color;
    }
    .icon-add {
      float: right;
      background: white;
      border-radius: 100%;
      font-size: 2rem;
      line-height: 100%;
    }
  }
</style>

<script>

import MembersList from '@/components/dashboardV2/MembersList'
import BarsList from '@/components/dashboardV2/BarsList'

export default {
  name: 'CommunityManager',
  components: {
    MembersList,
    BarsList
  },
  props: {
    community: Object,
    bars: Array,
    members: Array,
    activeBarId: String,
    activeMemberId: String
  }
}
</script>
