<template>
    <v-main>
        <h1>Morphic Community</h1>
        <AuthForm :submitForm="loginUser" buttonText="Login"/>
    </v-main>
</template>

<script>

import AuthForm from '@/components/AuthForm'

export default {
  name: 'Home',
  components: {
    AuthForm
  },
  methods: {
    async loginUser (loginInfo) {}
  }
}
</script>
