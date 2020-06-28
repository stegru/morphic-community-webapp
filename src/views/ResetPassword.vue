<template>
  <b-jumbotron class="bg-light">
    <b-card
    title="Reset Password"
    tag="form"
    style="max-width: 30rem;"
    class="mb-2 text-center mx-auto"
    >
      <br/>
      <b-card-text>
        Enter your email address and we will send you a link to reset your password.
      </b-card-text>
      <b-form @submit.stop.prevent="onSubmit">
        <b-alert variant="danger" :show="errorAlert">
          {{ errorMessage }}
        </b-alert>
        <b-alert variant="success" :show="successAlert">
          {{ successMessage }}
        </b-alert>
        <b-form-group>
          <b-form-input
            v-model="$v.form.email.$model"
            :state="validateState('email')"
            label="Email"
            placeholder="Enter your email address"
          />
          <b-form-invalid-feedback>{{ emailValidationError }}</b-form-invalid-feedback>
        </b-form-group>
        <br/>
        <b-button type="submit" variant="primary">Send password reset email</b-button>
      </b-form>
    </b-card>
  </b-jumbotron>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { ERROR_MAP, MESSAGES } from '@/utils/constants'

export default {
  data () {
    return {
      form: {
        email: ''
      },
      errorAlert: false,
      successAlert: false,
      errorMessage: null,
      successMessage: MESSAGES.successfulReset,
      emailValidationError: MESSAGES.emailValidationError
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
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
      this.$store.dispatch('resetPassword', this.$v.form.$model)
        .then(() => {
          this.successAlert = true
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch(err => {
          if (err.response) {
            this.errorMessage = err.response.message || 'Something went wrong'
          } else {
            this.errorMessage = ERROR_MAP[500]
          }
          this.errorAlert = true
        })
    }
  }
}
</script>
