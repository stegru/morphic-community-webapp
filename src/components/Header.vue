<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="mb-5">
    <b-navbar-brand href="/" title="Morphic Community">
      <img src="/img/logo.svg" alt="Morphic Community">
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item to="/" exact-active-class="active">Home</b-nav-item>
      <b-nav-item to="/about-morphic" exact-active-class="active">About Morphic</b-nav-item>
      <b-nav-item to="/our-communities" exact-active-class="active">Our Communities</b-nav-item>
      <b-nav-item to="/about-us" exact-active-class="active">About Us</b-nav-item>
      <b-nav-item to="/contact-us" exact-active-class="active">Contact Us</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="isLoggedIn" @click="logout">
        <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right>
        Logout
      </b-nav-item>
      <b-nav-item v-else to="/">
        <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right>
        Login
      </b-nav-item>
      <b-nav-item v-if="!isLoggedIn" to="/registration" exact-active-class="active">
        <b-icon-person-fill></b-icon-person-fill>
        Registration
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
