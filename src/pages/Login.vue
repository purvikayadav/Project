<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 100vh;">
    <v-card class="pa-6" max-width="400">
      <!-- Logo -->
      <v-row justify="center">
        <v-img src="/logo.png" max-width="150"></v-img>
      </v-row>

      <h2 class="text-center mt-3">Log In</h2>

      <!-- Login Form -->
      <v-form ref="form" v-model="isValid">
        <v-text-field v-model="form.email" label="Enter Email ID*" :rules="[rules.required, rules.email]" outlined dense></v-text-field>
        <v-text-field v-model="form.password" label="Enter Password*" :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showPassword = !showPassword"
          :rules="[rules.required, rules.minLength]" outlined dense></v-text-field>

        <v-btn block color="primary" class="mt-3" @click="login">Login</v-btn>

        <v-divider class="my-4">OR</v-divider>

        <!-- Google Login -->
        <v-btn block color="red" class="white--text" @click="googleLogin">
          <v-icon left>mdi-google</v-icon> Login with Google
        </v-btn>

        <!-- Forgot Password -->
        <p class="text-center mt-3">
          <a href="#" class="text-red" @click.prevent="showForgotPassword">Forgot Password?</a>
        </p>

        <!-- Sign Up -->
        <p class="text-center">
          Don’t have an Account? <a href="#" @click.prevent="redirectToSignUp" class="text-primary">Sign Up</a>
        </p>

        <!-- Error Message -->
        <v-alert v-if="errorMessage" type="error" dismissible>
          {{ errorMessage }}
        </v-alert>
      </v-form>
    </v-card>

    <!-- Forgot Password Dialog -->
    <v-dialog v-model="forgotPasswordDialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="text-h6 d-flex justify-space-between">
          Forgot Password
          <v-btn icon @click="forgotPasswordDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <Forgotpassword @close="forgotPasswordDialog = false" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import Forgotpassword from "../components/Forgotpassword.vue";

export default {
  components: {
    Forgotpassword,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isValid: false,
      showPassword: false,
      errorMessage: "", // To store the error message
      forgotPasswordDialog: false,
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        minLength: (v) => v.length >= 6 || "Minimum 6 characters",
      },
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          // Call the GET API to validate the credentials
          const response = await axios.get("https://api-3l0u.onrender.com/users", {
            params: {
              email: this.form.email,
            },
          });

          // Find user by email
          const user = response.data.find(
            (user) => user.email === this.form.email && user.password === this.form.password
          );

          if (user) {
            // If credentials match, redirect to the dashboard
            localStorage.setItem("user", JSON.stringify(user)); // Store user details in sessionStorage
            this.$router.push("/dashboard");
          } else {
            // If credentials don't match, show an error
            this.errorMessage = "Invalid email or password. Please try again.";
          }
        } catch (error) {
          console.error("Error during login:", error);
          this.errorMessage = "An error occurred during login. Please try again later.";
        }
      }
    },
    googleLogin() {
      console.log("Google Login Clicked");
    },
    showForgotPassword() {
      this.forgotPasswordDialog = true; // Open the dialog properly
    },
    redirectToSignUp() {
      this.$router.push("/"); // Ensure it routes to the correct sign-up page
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
