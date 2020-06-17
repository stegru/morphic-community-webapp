<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="mb-5">
    <b-navbar-brand href="/" title="Morphic Community">
      <img src="/img/logo.svg" alt="Morphic Community">
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item to="/" active>Home</b-nav-item>
      <b-nav-item to="/about">About</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item to="/">
        <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right>
        Login
      </b-nav-item>
      <b-nav-item to="/registration">
        <b-icon-person-fill></b-icon-person-fill>
        Registration
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>
