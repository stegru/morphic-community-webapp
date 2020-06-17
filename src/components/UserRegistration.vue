<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-form-group>
      <b-form-input
        v-model="$v.userInfo.communityName.$model"
        :state="validateState('communityName')"
        label="my-community"
        placeholder="my-community"
      />
      <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <b-form-input
        v-model="$v.userInfo.email.$model"
        :state="validateState('email')"
        label="Email"
        placeholder="Enter your email"
      />
      <b-form-invalid-feedback>This is a required field and must be a valid email address.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <b-form-input
        v-model="$v.userInfo.password.$model"
        :state="validateState('password')"
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      <b-form-invalid-feedback>This is a required field and must be at least 6 characters.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <b-form-input
        v-model="$v.userInfo.confirmPassword.$model"
        :state="validateState('confirmPassword')"
        label="Password Confirmation"
        placeholder="Password Confirmation"
        type="password"
      />
      <b-form-invalid-feedback>This is a required field and must match password.</b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit" variant="primary">Create new Community</b-button>
  </b-form>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data () {
    return {
      userInfo: {
        communityName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  validations: {
    userInfo: {
      communityName: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    validateState (name) {
      const { $dirty, $error } = this.$v.userInfo[name]
      return $dirty ? !$error : null
    },
    onSubmit () {
      this.$v.userInfo.$touch()
      if (this.$v.userInfo.$anyError) {
        return
      }

      alert('Form Submitted')
    }
  }
}
</script>
