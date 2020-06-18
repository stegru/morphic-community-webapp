<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-form-group>
      <b-form-input
        v-model="$v.form.communityName.$model"
        :state="validateState('communityName')"
        label="my-community"
        placeholder="my-community"
      />
      <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <b-form-input
        v-model="$v.form.email.$model"
        :state="validateState('email')"
        label="Email"
        placeholder="Enter your email"
      />
      <b-form-invalid-feedback>This is a required field and must be a valid email address.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <b-form-input
        v-model="$v.form.password.$model"
        :state="validateState('password')"
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      <b-form-invalid-feedback>This is a required field and must be at least 6 characters.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <b-form-input
        v-model="$v.form.confirmPassword.$model"
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
import { register } from '@/services/userService'

export default {
  mixins: [validationMixin],
  data () {
    return {
      form: {
        communityName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  validations: {
    form: {
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
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    async onSubmit () {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      try {
        let response = await register(this.$v.form.$model)
        alert('Form Submitted')
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('error::Network Error')
        }
      }
    }
  }
}
</script>
