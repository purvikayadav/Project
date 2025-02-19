<template>
    <v-container class="d-flex justify-center align-center" style="min-height: 100vh;">
      <v-card class="pa-6" max-width="400">
        <v-card-title class="text-center">
          <h1>Profile</h1>
        </v-card-title>
  
        <v-form ref="form" v-model="formValid">
          <!-- Email Field (Read-Only) -->
          <v-text-field
            v-model="form.email"
            label="Email"
            outlined
            dense
            readonly
          ></v-text-field>
  
          <!-- Password Field -->
          <v-text-field
            v-model="form.password"
            label="New Password"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            outlined
            dense
            :rules="[rules.required, rules.minLength]"
          ></v-text-field>
  
          <!-- Update Button -->
          <v-btn block color="primary" class="mt-4" @click="updateProfile" style="min-width: 280px;">
            Update
          </v-btn>
  
          <!-- Back Button -->
          <v-btn block color="secondary" class="mt-2" @click="goBack" style="min-width: 280px;">
            <v-icon left>mdi-arrow-left</v-icon>
            Back to Dashboard
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  
  const form = ref({
    email: "",
    password: ""
  });
  
  const showPassword = ref(false);
  const formValid = ref(true); // Keep track of form validity
  
  const rules = {
    required: (v) => !!v || "This field is required",
    minLength: (v) => v.length >= 6 || "Minimum 6 characters required"
  };
  
  // Fetch logged-in user email on mount
  onMounted(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      form.value.email = JSON.parse(storedUser).email;
    } else {
      console.error("No user found in localStorage.");
    }
  });
  
  // Function to update the user password
  const updateProfile = async () => {
    if (!form.value.password) {
      alert("Please enter a new password.");
      return;
    }
  
    try {
      // Send a POST request to update the password for the same email
      const response = await axios.put("https://api-3l0u.onrender.com/users", {
        email: form.value.email,
        password: form.value.password
      });
  
      console.log("Password Updated:", response.data);
  
      // Store updated email in localStorage
      localStorage.setItem("user", JSON.stringify({ email: form.value.email }));
  
      // Reset the form fields and validation
      form.value.password = "";  // Clear the password field
      formValid.value = true;  // Reset form validation
  
      alert("Password updated successfully!");
  
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };
  
  // Redirect to dashboard
  const goBack = () => {
    router.push("/dashboard");
  };
  </script>
  
  <style scoped>
  .v-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  </style>
  