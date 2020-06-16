<template>

  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Morphic Community</b-navbar-brand>

    <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav>
        <b-nav-item to="/">Login</b-nav-item>
        <b-nav-item to="/registration">Registration</b-nav-item>
    </b-navbar-nav>
</b-navbar>
</template>

<script>

export default {
  name: 'Header'
}
</script>
