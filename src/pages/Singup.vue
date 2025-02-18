<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 100vh;">
    <v-card class="pa-6" max-width="400">
      <!-- Logo -->
      <v-row justify="center">
        <v-img src="/logo.png" max-width="150"></v-img>
      </v-row>

      <h2 class="text-center mt-3">Sign Up</h2>

      <!-- Sign Up Form -->
      <v-form ref="form" v-model="isValid">
        <v-text-field v-model="form.name" label="Enter Full Name*" :rules="[rules.required]" outlined dense></v-text-field>
        <v-text-field v-model="form.email" label="Enter Email ID*" :rules="[rules.required, rules.email]" outlined dense></v-text-field>
        <v-text-field v-model="form.password" label="Enter Password*" :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showPassword = !showPassword"
          :rules="[rules.required, rules.minLength]" outlined dense></v-text-field>
        <v-text-field v-model="form.confirmPassword" label="Enter Confirm Password*" :type="showPassword ? 'text' : 'password'"
          :rules="[rules.required, rules.matchPassword]" outlined dense></v-text-field>

        <v-btn block color="primary" class="mt-3" @click="signUp">Sign Up</v-btn>

        <v-divider class="my-4">OR</v-divider>

        <!-- Google Login -->
        <v-btn block color="red" class="white--text" @click="googleLogin">
          <v-icon left>mdi-google</v-icon> Login with Google
        </v-btn>

        <!-- Terms and Conditions -->
        <v-card-text class="text-center text-caption mt-3">
          By Signing up, I agree to EmpowerSun’s <a href="">Privacy Policy</a> and <a href="">Terms of Services</a>.
        </v-card-text>

        <!-- Already have an account? -->
        <p class="text-center mt-3">
          Are you an Existing User? <a href="" @click.prevent="redirectToLogin" class="text-primary">Login</a>
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter(); // Use the router instance

const form = ref({
  name: "",
  email: "",
  password: "",
  // confirmPassword: "",  // Uncomment this if you're validating confirmPassword
});

const isValid = ref(false);
const showPassword = ref(false);
const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  minLength: (v) => v.length >= 6 || "Minimum 6 characters",
  matchPassword: (v) => v === form.value.password || "Passwords do not match",
};

const signUp = async () => {
  const { valid } = await form.value.validate(); // Validate form correctly

  if (!valid) {
    console.error("Form validation failed");
    return;
  }

  try {
    // Prepare data for the API request
    const formData = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };

    // Send data to backend
    const response = await axios.post("http://localhost:3000/users", formData);
    console.log("API Response:", response.data);

    // Store user details in sessionStorage
    localStorage.setItem("user", JSON.stringify(response.data));
    // Ensure route exists before redirecting
    setTimeout(() => {
      router.push("/dashboard");
    }, 500); // Small delay to ensure data is stored
  } catch (error) {
    console.error("Error during sign up:", error);
  }
};


const googleLogin = () => {
  console.log("Google Login Clicked");
};

const redirectToLogin = () => {
  router.push("/login"); // Use router.push() instead of this.$router.push()
};
</script>


<style scoped>
a {
  text-decoration: none;
}
</style>
