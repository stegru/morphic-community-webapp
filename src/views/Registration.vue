<template>
  <b-jumbotron class="bg-light">
    <h3 class="mb-3">Register your new Comminity</h3>
    <p>Integer viverra ultricies risus. Donec luctus hendrerit fermentum. Aenean volutpat, nunc quis dictum bibendum, odio nulla euismod ligula, eu tincidunt turpis mauris quis quam. Fusce vitae leo dolor. Proin dapibus purus lobortis pretium porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus eget purus vel odio placerat pharetra ac non erat. Sed a dui eget dui imperdiet interdum. Mauris in nisl at augue posuere aliquet vel sit amet orci. Suspendisse dictum neque eget mollis iaculis. </p>
    <br>
    <b-row>
      <b-col md="9">
        <UserRegistration />
      </b-col>
      <b-col col md="3">
        <h4 class="mt-5 text-info">Important Notice</h4>
        <p>Nulla laoreet eros in nibh elementum feugiat. Pellentesque maximus in nisi et aliquet.</p>
        <p>Phasellus id odio non arcu sollicitudin rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse vel pretium urna.</p>
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<script>
import UserRegistration from '@/components/UserRegistration'

export default {
  components: {
    UserRegistration
  }
}
</script>
