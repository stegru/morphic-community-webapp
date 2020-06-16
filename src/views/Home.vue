<template>
    <b-container>
        <h1>Morphic Community</h1>
        <AuthForm :submitForm="loginUser" buttonText="Login"/>
    </b-container>
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
