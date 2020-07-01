<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-alert variant="danger" :show="errorAlert">
      {{ errorMessage }}
    </b-alert>
    <b-alert variant="success" :show="successAlert">
      {{ successMessage }}
    </b-alert>
    <legend>Basic Information</legend>
    <b-form-group>
      <b-input-group append=".morphic-community.com" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          v-model="$v.form.communityName.$model"
          :state="validateState('communityName')"
          label="my-community"
          placeholder="my-community"
        />
      </b-input-group>
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
    <br>
    <legend>Subscription Plan</legend>
    <b-form-group id="subscription-plans">
      <b-form-radio v-model="$v.form.subscriptionPlan.$model" name="bronze" value="bronze">
        <h5 class="text-bronze"><b>Bronze Tier</b></h5>
        <h6 class="mb-0"><b>$10</b>/mo for <b>10</b> member community</h6>
      </b-form-radio>
      <b-form-radio v-model="$v.form.subscriptionPlan.$model" name="silver" value="silver">
        <h5 class="text-secondary"><b>Silver Tier</b></h5>
        <h6 class="mb-0"><b>$15</b>/mo for <b>20</b> member community</h6>
      </b-form-radio>
      <b-form-radio v-model="$v.form.subscriptionPlan.$model" name="gold" value="gold">
        <h5 class="text-warning"><b>Gold Tier</b></h5>
        <h6 class="mb-0"><b>$20</b>/mo for <b>50</b> member community</h6>
      </b-form-radio>
      <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
    </b-form-group>
    <br>
    <legend>Payment Gateway</legend>
    <b-form-group id="payment-gateways">
      <b-form-radio v-model="$v.form.paymentOptions.$model" name="stripe" value="stripe">
        <img src="/img/payment-icon-stripe.svg" alt="Stripe">
      </b-form-radio>
      <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit" variant="primary">Create new Community</b-button>
  </b-form>
</template>

<style>
  #subscription-plans .custom-radio,
  #payment-gateways .custom-radio {
    background: white;
    border: 1px solid #ddd;
    padding: 1rem 1rem 1rem 2.5rem;
    margin-bottom: .5rem;
  }
  #subscription-plans label {
    width: 100%;
  }
  #payment-gateways img {
    height: 2rem;
    vertical-align: baseline;
  }
</style>

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
