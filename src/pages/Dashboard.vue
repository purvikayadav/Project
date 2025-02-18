<template>
  <v-app>
    <v-navigation-drawer permanent class="sidebar">
      <v-list>
        <v-list-item title="Dashboard" prepend-icon="mdi-view-dashboard"></v-list-item>
        <v-divider></v-divider>
        <v-list-item title="Profile" prepend-icon="mdi-account" @click="profileClick" ></v-list-item>
        <v-list-item title="Settings" prepend-icon="mdi-cog"></v-list-item>
        <v-list-item title="Logout" prepend-icon="mdi-logout" @click="logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="dashboard-container">
      <h1>Dashboard</h1>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  checkUserSession();
  restrictAuthPages();
  preventAuthPageAccess();
});

// ✅ Ensure user session exists
const checkUserSession = () => {
  const user = localStorage.getItem("user"); // changed to localStorage
  if (!user) {
    router.replace("/"); // Redirect to login if no session exists
  }
};

// ✅ Prevent back navigation to login or signup
const restrictAuthPages = () => {
  const restrictedPages = ["/", "/login"];

  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    if (restrictedPages.includes(window.location.pathname)) {
      window.history.pushState(null, null, window.location.href);
    }
  };
};

// ✅ Prevent logged-in users from accessing login/signup manually
const preventAuthPageAccess = () => {
  router.beforeEach((to, from, next) => {
    const user = localStorage.getItem("user"); // changed to localStorage
    if (user && ["/", "/login"].includes(to.path)) {
      return next("/dashboard"); // Redirect to dashboard if logged in
    }
    next();
  });
};

// ✅ Logout function
const logout = () => {
  localStorage.removeItem("user"); // changed to localStorage
  router.replace("/login");
};

const profileClick = () =>
{
  router.push("/profile")
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  margin-left: 260px;
}

.sidebar {
  width: 250px;
  background: #1e1e2f;
  color: white;
}
</style>
