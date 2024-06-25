<template>
    <div class="layout">
      <q-toolbar class="bg-primary text-white">
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleDrawer" />
        <q-toolbar-title>HTWBook</q-toolbar-title>
        <q-space />
  
        <!-- Navigation Links -->
        <q-btn flat to="/home" label="Home" type="a" />
        <q-btn flat to="/about" label="About" type="a" />
        <q-btn flat to="/posts" label="Posts" type="a" />
  
      </q-toolbar>
  
      <!-- Hauptbereich für geroutete Ansichten -->
      <router-view></router-view>
  
      <!-- Footer -->
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
        // Logik zum Öffnen/Schließen einer seitlichen Navigationsleiste (falls implementiert)
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
  
  .footer {
    margin-top: auto;
    text-align: center;
    padding: 10px;
    background: #f4f4f4;
  }
  </style>
  