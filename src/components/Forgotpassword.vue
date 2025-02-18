<template>
    <v-container>
      <v-card class="pa-6" max-width="400">
        <!-- <h2 class="text-center mb-4">Forgot Password</h2> -->
        
        <v-form ref="form" v-model="isValid">
          <!-- Email Field -->
          <v-text-field
            v-model="form.email"
            label="Enter Your Email"
            :rules="[rules.required, rules.email]"
            outlined
            dense
          ></v-text-field>
  
          <!-- New Password Field -->
          <v-text-field
            v-model="form.newPassword"
            label="Enter New Password"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            :rules="[rules.required, rules.minLength]"
            outlined
            dense
          ></v-text-field>
  
          <!-- Save Changes Button -->
          <v-btn block color="primary" class="mt-3" @click="savePassword">Save Changes</v-btn>
        </v-form>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          email: "",
          newPassword: "",
        },
        isValid: false,
        showPassword: false,
        rules: {
          required: (v) => !!v || "This field is required",
          email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
          minLength: (v) => v.length >= 6 || "Minimum 6 characters",
        },
      };
    },
    methods: {
      savePassword() {
        if (this.$refs.form.validate()) {
          console.log("Password changed for:", this.form.email);
          alert("Your password has been changed successfully!");
          this.$emit("close"); // Close the dialog after success
        }
      },
    },
  };
  </script>
  
  <style scoped>
  h2 {
    font-weight: bold;
  }
  </style>
  