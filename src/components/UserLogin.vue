<template>
  <div>
    <h4 class="mb-3">Login to your Community</h4>
    <b-form @submit.stop.prevent="onSubmit">
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
      <b-form-checkbox-group>
        <b-form-checkbox
          v-model="userInfo.keep_logged"
          value="1"
          unchecked-value="0"
        >
          Keep me logged in
        </b-form-checkbox>
      </b-form-checkbox-group>
      <br>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email } from 'vuelidate/lib/validators'
  import { login } from '@/services/userService'

  export default {
    mixins: [validationMixin],
    data () {
      return {
        userInfo: {
          email: '',
          password: '',
          keep_logged: 1
        }
      }
    },
    validations: {
      userInfo: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    },
    methods: {
      validateState (name) {
        const { $dirty, $error } = this.$v.userInfo[name]
        return $dirty ? !$error : null
      },
      async onSubmit () {
        this.$v.userInfo.$touch()
        if (this.$v.userInfo.$anyError) {
          return
        }
        try {
          let response = await login(this.$v.userInfo.$model)
          alert('Successful login')
        } catch (error) {
          console.log(error.response)
        }
      }
    }
  }
</script>
