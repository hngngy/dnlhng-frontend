<template>
  <div class="layout">
    <q-toolbar class="custom-toolbar text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleDrawer" />
      <q-toolbar-title>HTWBook</q-toolbar-title>
      <q-space />

      <q-btn flat to="/home" label="Home" type="a" />
      <q-btn flat to="/about" label="About" type="a" />
      <q-btn flat to="/posts" label="Posts" type="a" />
      <q-btn flat to="/chat" label="chat" type="a" />
    </q-toolbar>

    <router-view></router-view>

    <footer class="footer">
      © 2024 DeineApp
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    toggleDrawer() {
      // Öffnen schließen sidebar
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.custom-toolbar {
  background-color: #76B900;
}

.footer {
  margin-top: auto;
  text-align: center;
  padding: 10px;
  background: #f4f4f4;
}
</style>
