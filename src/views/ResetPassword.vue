<template>
  <b-jumbotron class="mb-0" bg-variant="light">
    <b-row class="pt-5 pb-5">
      <b-col md="3">
      </b-col>
      <b-col md="6">
        <h3>Reset your password</h3>
        <p class="lead">Please enter the email address you are registered with and we will send you message with your temporary password.</p>
        <br />
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
          <b-row>
            <b-col md="6">
              <b-button disabled type="submit" variant="primary">Reset Password</b-button>
              <b-button to="/" variant="success" class="ml-1">Login</b-button>
            </b-col>
            <b-col md="6">
              <div class="small text-right">
                <b-button to="/" size="sm" variant="outline-secondary" class="ml-2">Cancel</b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
      <b-col md="3">
      </b-col>
    </b-row>
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
            this.errorMessage = (err.response.message ? err.response.message : (ERROR_MAP[err.response.status] ? ERROR_MAP[err.response.status] : 'Something went wrong'))
          } else {
            this.errorMessage = ERROR_MAP[500]
          }
          this.errorAlert = true
        })
    }
  }
}
</script>
