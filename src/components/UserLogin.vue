<template>
  <div>
    <h2 class="mb-3" id="user-login-heading">Login</h2>
    <b-alert variant="danger" :show="errorAlert">
      {{ errorMessage }}
    </b-alert>
    <b-form @submit.stop.prevent="onSubmit" role="form" aria-labelledby="user-login-heading">
      <b-form-group
        label="Enter your email:"
        label-for="login-user-email"
      >
        <b-form-input
          v-model="$v.userInfo.email.$model"
          :state="validateState('email')"
          placeholder="user@server.com"
          id="login-user-email"
        />
        <b-form-invalid-feedback>This is a required field and must be a valid email address.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Enter your password:"
        label-for="login-user-password"
      >
        <b-form-input
          v-model="$v.userInfo.password.$model"
          :state="validateState('password')"
          type="password"
          id="login-user-password"
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
      <!-- <b-button to="/reset-password" variant="success" class="ml-1">Lost Password</b-button> -->
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import { ERROR_MAP } from "@/utils/constants";

export default {
    mixins: [validationMixin],
    data() {
        return {
            userInfo: {
                email: "",
                password: "",
                keep_logged: 1
            },
            errorAlert: false,
            errorMessage: null
        };
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
        validateState(name) {
            const { $dirty, $error } = this.$v.userInfo[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.userInfo.$touch();
            if (this.$v.userInfo.$anyError) {
                return;
            }
            this.$store.dispatch("login", this.$v.userInfo.$model)
                .then(() => {
                    this.userInfo.email = "";
                    this.userInfo.password = "";
                    this.$router.push("/dashboard");
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.data.error === "invalid_credentials") {
                            this.errorMessage = ERROR_MAP[1];
                        } else {
                            this.errorMessage = ERROR_MAP[err.response.status] || "Something went wrong";
                        }
                    } else {
                        this.errorMessage = ERROR_MAP[500];
                    }
                    this.errorAlert = true;
                });
        }
    }
};
</script>
