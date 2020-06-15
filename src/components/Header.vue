<template>
<v-app-bar
      app
      color="primary"
      dark
    >
    <div class="d-flex align-center">
        <h2>Morphic Community</h2>
    </div>

    <v-spacer></v-spacer>

    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </nav>

    <v-spacer></v-spacer>

    <v-btn
        href="#"
        text
    >
    <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
    </v-btn>
</v-app-bar>
</template>

<script>

export default {
  name: 'Header'
}
</script>

<style>
nav a {
  font-weight: bold;
  color: #FFFFFF !important;
}

nav a.router-link-exact-active {
  color: #BBDEFB !important;
}
</style>
