<template>
  <div class="bg-light rounded p-3">
    <b-row>
      <b-col md="7">
        <b>{{ community.name }}</b><br>
        <b-link :href="'https://' + community.url + '.morphic-community.com/'">{{ community.url }}.morphic-community.com</b-link>
      </b-col>
      <b-col md="4">
        <b-row>
          <b-col md="6">
            <b>{{ community.plan }}</b> Plan
          </b-col>
          <b-col md="6">
            <div class="text-right small">
              <b>{{ community.members}}</b> / {{ community.maxMembers }} members
            </div>
          </b-col>
        </b-row>
        <b-progress :value="community.members" :max="community.maxMembers" variant="success" striped></b-progress>
      </b-col>
      <b-col md="1">
        <div class="text-right mt-2">
          <b-button to="/my-community" variant="primary" size="sm">Manage</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'HeaderCommunity',
  props: {
    community: Object
  }
}
</script>
