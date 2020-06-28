<template>
  <b-jumbotron class="bg-light">
    <h3>My Community</h3>
    <br/>
    <b-card-group columns>
      <b-card
      v-for="community in communities"
      :key="community.communityName"
      :title="community.communityName"
      tag="article"
      style="max-width: 20rem;"
      class="mb-5"
      >
        <b-card-text>
          Your community page:
          <br/>
          <a :href="'https://' + community.communityUrl" class="card-link">{{ community.communityUrl }}</a>
        </b-card-text>
        <b-card-text>
          Your subscription plan:
          <br/>
          {{ community.subscriptionPlan }}
        </b-card-text>
      </b-card>
    </b-card-group>
  </b-jumbotron>
</template>

<script>
export default {
  data () {
    return {
      communities: [
        {
          communityName: 'Old Community',
          communityUrl: 'old-community' + '.' + window.location.hostname + '.com',
          subscriptionPlan: 'Bronz'
        }, {
          communityName: 'New Community',
          communityUrl: 'new-community' + '.' + window.location.hostname + '.com',
          subscriptionPlan: 'Gold'
        }
      ]
    }
  }
}
</script>
