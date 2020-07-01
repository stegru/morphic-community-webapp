<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" id="top">
      <b-navbar-brand to="/" title="Morphic Community">
        <img src="/img/logo.svg" alt="logo">
        Morphic Community
      </b-navbar-brand>

      <b-navbar-nav class="mr-auto">
        <b-nav-item to="/" exact-active-class="active">Home</b-nav-item>
        <b-nav-item to="/about-morphic" exact-active-class="active">About Morphic</b-nav-item>
        <b-nav-item to="/our-communities" exact-active-class="active">Our Communities</b-nav-item>
        <b-nav-item to="/about-us" exact-active-class="active">About Us</b-nav-item>
        <b-nav-item to="/contact-us" exact-active-class="active">Contact Us</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item v-if="isLoggedIn" exact-active-class="active" to="/my-community">
          <b-icon-person-fill></b-icon-person-fill>
          My Community
        </b-nav-item>
        <b-nav-item v-if="isLoggedIn" @click="logout">
          <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right>
          Logout
        </b-nav-item>
        <b-nav-item
          v-if="!isLoggedIn"
          @click="visible = !visible"
        >
          <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right>
          Login
        </b-nav-item>
        <b-nav-item
          v-if="!isLoggedIn"
          to="/registration"
          exact-active-class="active"
        >
          <b-icon-person-fill></b-icon-person-fill>
          Registration
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-collapse id="collapse-login-block" v-model="visible">
      <b-button-close
        aria-controls="collapse-login-block"
        @click="visible = false"
        class="mr-3 mt-3"
      />
      <BlockLoginRegister />
    </b-collapse>
  </div>
</template>

<style>
  nav#top {
    margin: 1rem 0;
    border-radius: .3rem;
  }

  nav#top a.nav-link:focus {
    outline: 0;
  }
  nav#top a.nav-link.active {
    color: white;
    background: #002957;
    border-bottom: 3px solid #84c661;
  }

  .navbar-brand img {
    height: 2rem;
  }
</style>

<script>
import BlockLoginRegister from '@/components/BlockLoginRegister'

export default {
  components: {
    BlockLoginRegister
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  },
  watch: {
    $route (to, from) {
      this.visible = false
    }
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
