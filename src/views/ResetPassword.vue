<template>
  <b-jumbotron class="bg-light">
    <b-row>
      <b-col md="7">
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
          <b-button type="submit" variant="primary">Reset Password</b-button>
        </b-form>
      </b-col>
      <b-col md="4" offset="1">
        <h4 class="mt-3 text-info">Important Notice</h4>
        <p>Nulla laoreet eros in nibh elementum feugiat. Pellentesque maximus in nisi et aliquet.</p>
        <p>Phasellus id odio non arcu sollicitudin rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse vel pretium urna.</p>
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
      emailValidationError: MESSAGES.emailValidationError,
      recaptchaToken: ''
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
  async mounted () {
    await this.$recaptchaLoaded()
    this.recaptchaToken = await this.$recaptcha('login')
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
      const body = {
        email: this.$v.form.$model.email,
        g_recaptcha_response: this.recaptchaToken
      }
      this.$store.dispatch('resetPassword', body)
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
