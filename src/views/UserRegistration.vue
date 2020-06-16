<template>
  <b-container>
    <h1>Register</h1>
    <AuthForm :submitForm="registerUser" buttonText="Register" hasName=true />
  </b-container>
</template>

<script>

import AuthForm from '@/components/AuthForm.vue'

export default {
  components: {
    AuthForm
  },
  methods: {
    async registerUser (registrationInfo) {}
  }
}
</script>
