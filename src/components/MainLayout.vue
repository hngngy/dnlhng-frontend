<template>
  <div class="layout">
    <q-toolbar class="custom-toolbar text-white">
      <q-toolbar-title>HTWBook</q-toolbar-title>
      <q-space />

      <q-btn flat to="/home" label="Home" type="a" />
      <q-btn flat to="/about" label="About" type="a" />
      <q-btn flat to="/posts" label="Feed" type="a" />
      <q-btn flat icon="brightness_4" @click="toggleDarkMode" />
    </q-toolbar>

    <router-view></router-view>

    <footer class="footer">© 2024 HTWBook</footer>
  </div>
</template>

<script>
import { Dark } from 'quasar'

export default {
  name: 'MainLayout',
  methods: {
    toggleDrawer() {
      // Öffnen schließen sidebar
    },
    toggleDarkMode() {
      Dark.toggle()
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
  background-color: #76b900;
}

.footer {
  margin-top: auto;
  text-align: center;
  padding: 10px;
  background: #76b900;
  color: white;
}
</style>
