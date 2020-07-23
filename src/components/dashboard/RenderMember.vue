<template>
  <span v-if="member.first_name">
    <b-link v-bind:key="member.id" :to="'/dashboard/member/' + member.id" pill variant="outline-dark" class="mr-1 mb-1">
      <b-icon-person-circle></b-icon-person-circle>
      {{ member.first_name }} {{ member.last_name }}
    </b-link>
    <b class="small">({{ member.state }})</b>
  </span>
</template>

<script>

export default {
  name: 'RenderMember',
  props: {
    member: Object
  }
}
</script>
