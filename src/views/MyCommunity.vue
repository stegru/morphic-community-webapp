<template>
  <b-jumbotron class="bg-light">
    <h3>My Communities</h3>
    <p>Sed bibendum neque vel lorem maximus, ut euismod dui ultricies. Vestibulum sed ipsum in arcu facilisis posuere id sit amet risus. In sed cursus turpis. Duis ligula magna, tempor id mattis non, sollicitudin vel nisl. </p>
    <b-button variant="primary" disabled>
      Create New Community
    </b-button>
    <hr class="mt-5 mb-5" />
    <b-card-group columns>
      <b-card
      v-for="community in communities"
      :key="community.communityName"
      :title="community.communityName"
      tag="article"
      style="width: 20rem;"
      class="mb-5"
      >
        <b-card-text>
          Community Page:
          <br/>
          <a :href="'https://' + community.communityUrl" class="card-link">{{ community.communityUrl }}</a>
        </b-card-text>
        <b-card-text>
          Subscription Plan:
          <br/>
          <b :class="'text-' + community.subscriptionIdent">{{ community.subscriptionPlan }}</b>
        </b-card-text>
        <b-card-text>
          Next Payment:
          <br>
          <b>
            {{ community.paymentNext }}
            <span v-if="community.paymentOk == false">
              (<i class="text-danger">Overdue</i>)
            </span>
          </b>
        </b-card-text>
        <b-card-text>
          Members:
          <br>
          <b>{{ community.memberCurrent }}</b> / {{ community.memberLimit }}
        </b-card-text>
        <b-card-text>
          <b-button :href="'https://' + community.communityUrl" variant="success">
            <b-icon-arrow-bar-right></b-icon-arrow-bar-right> Visit Community
          </b-button>
          <b-button variant="danger" disabled class="ml-1">Delete</b-button>
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
          subscriptionPlan: 'Bronze',
          subscriptionIdent: 'bronze',
          paymentNext: '7/22/2020',
          paymentOk: true,
          memberLimit: 10,
          memberCurrent: 7
        },
        {
          communityName: 'New Community',
          communityUrl: 'new-community' + '.' + window.location.hostname + '.com',
          subscriptionPlan: 'Gold',
          subscriptionIdent: 'gold',
          paymentNext: '6/29/2020',
          paymentOk: false,
          memberLimit: 50,
          memberCurrent: 22
        }
      ]
    }
  }
}
</script>
