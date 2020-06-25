<template>
  <b-jumbotron bg-variant="light" id="login-register">
    <b-button-close />
    <b-row>
      <b-col lg="4"></b-col>
      <b-col md="6" lg="4">
        <h3>Register Community</h3>
        <p>Phasellus tincidunt maximus orci in scelerisque. Nulla enim nisi, dignissim vel quam eu, aliquet efficitur sapien. Morbi eleifend ligula sit amet justo vestibulum euismod.</p>
        <p>
          <b-button to="/registration" variant="primary">Registration Form</b-button>
        </p>
      </b-col>
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

export default {
  name: 'BlockLoginRegister',
  components: {
    UserLogin
  }
}
</script>