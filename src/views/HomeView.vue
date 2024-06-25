<template>
  <div class="home">
    <h1>Welcome to Your Vue App</h1>
    <p>This is your starting page. Feel free to modify it and explore the features of your Vue application.</p>

    <div class="links">
      <router-link to="/chat" class="button">Go to Chat</router-link>
      <router-link to="/posts" class="button">View Posts</router-link>
      <router-link to="/about" class="button">About Us</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px); /* Annahme: Navbar und Footer sind zusammen 100px hoch */
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.links .button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.links .button:hover {
  background-color: #333;
}
</style>
