<template>
  <div>
    <h1>Welcome to Our Chat Platform!</h1>
    <div v-for="chatroom in chatrooms" :key="chatroom">
      <router-link :to="`/chat/${chatroom}`">{{ chatroom }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatrooms: []
    }
  },
  mounted() {
    fetch('http://localhost:8081/chatrooms')
      .then((response) => response.json())
      .then((data) => {
        this.chatrooms = data
      })
      .catch((error) => console.error('Error loading chatrooms:', error))
  }
}
</script>
