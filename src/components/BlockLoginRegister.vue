<template>
  <b-jumbotron bg-variant="light" id="login-register">
    <b-row>
      <b-col lg="1"></b-col>
      <b-col md="6" lg="6">
        <h3 class="mb-3">Register Community</h3>
        <UserRegistration />
      </b-col>
      <b-col lg="1"></b-col>
      <b-col md="6" lg="4">
        <UserLogin />
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<style>
  #login-register {
    padding: 2rem 2rem;
    background: url(/img/login.jpg) no-repeat left center;
  }
</style>

<script>
import UserLogin from '@/components/UserLogin'
import UserRegistration from '@/components/UserRegistration'

export default {
  name: 'BlockLoginRegister',
  components: {
    UserLogin,
    UserRegistration
  }
}
</script>
