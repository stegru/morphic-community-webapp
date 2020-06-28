<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-alert variant="danger" :show="errorAlert">
      {{ errorMessage }}
    </b-alert>
    <b-alert variant="success" :show="successAlert">
      {{ successMessage }}
    </b-alert>
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
        v-model="$v.form.firstName.$model"
        :state="validateState('firstName')"
        label="First name"
        placeholder="First name"
      />
      <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <b-form-input
        v-model="$v.form.lastName.$model"
        :state="validateState('lastName')"
        label="Last name"
        placeholder="Last name"
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
    <b-form-group label="Subscription Plan">
      <b-form-radio v-model="$v.form.subscriptionPlan.$model" name="bronze" value="bronze">Bronze</b-form-radio>
      <b-form-radio v-model="$v.form.subscriptionPlan.$model" name="silver" value="silver">Silver</b-form-radio>
      <b-form-radio v-model="$v.form.subscriptionPlan.$model" name="gold" value="gold">Gold</b-form-radio>
      <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Subscription Plan">
      <b-form-radio v-model="$v.form.paymentOptions.$model" name="stripe" value="stripe">Stripe</b-form-radio>
      <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit" variant="primary">Create new Community</b-button>
  </b-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'
import { ERROR_MAP, MESSAGES } from '@/utils/constants'

export default {
  mixins: [validationMixin],
  data () {
    return {
      form: {
        communityName: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        subscriptionPlan: 'bronze',
        paymentOptions: 'stripe'
      },
      errorAlert: false,
      successAlert: false,
      errorMessage: null,
      successMessage: MESSAGES.successfulRegistration
    }
  },
  validations: {
    form: {
      communityName: {
        required
      },
      firstName: {
        required
      },
      lastName: {
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
      },
      subscriptionPlan: {
        required
      },
      paymentOptions: {
        required
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
      this.$store.dispatch('register', this.$v.form.$model)
        .then(() => {
          this.successAlert = true
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        })
        .catch(err => {
          if (err.response) {
            this.errorMessage = ERROR_MAP[err.response.status] || 'Something went wrong'
          } else {
            this.errorMessage = ERROR_MAP[500]
          }
          this.errorAlert = true
        })
    }
  }
}
</script>
