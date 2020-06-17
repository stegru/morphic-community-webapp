<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h3 class="mb-3">Register your new Comminity</h3>
        <p>Integer viverra ultricies risus. Donec luctus hendrerit fermentum. Aenean volutpat, nunc quis dictum bibendum, odio nulla euismod ligula, eu tincidunt turpis mauris quis quam. Fusce vitae leo dolor. Proin dapibus purus lobortis pretium porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus eget purus vel odio placerat pharetra ac non erat. Sed a dui eget dui imperdiet interdum. Mauris in nisl at augue posuere aliquet vel sit amet orci. Suspendisse dictum neque eget mollis iaculis. </p>
        <br>
        <UserRegistration />
      </b-col>
      <b-col cols="3">
        <InfoLogin />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import UserRegistration from '@/components/UserRegistration'
  import InfoLogin from '@/components/InfoLogin'

  export default {
    components: {
      UserRegistration,
      InfoLogin
    }
  }
</script>
