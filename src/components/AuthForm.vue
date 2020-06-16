<template>
  <b-form v-model="valid">

    <b-form-input v-model="userInfo.email" label="Email" placeholder="Enter your email"/>

    <b-form-input v-model="userInfo.password" label="Password" placeholder="Enter your password" type="password"/>

    <b-button @click="submitForm(userInfo)">Login</b-button>
  </b-form>
</template>

<script>

// import validations from '@/utils/validations'

export default {
  data () {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        email: '',
        password: ''
      }/*,
      ...validations*/
    }
  },
  props: ['submitForm']
}
</script>
