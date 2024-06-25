<template>
  <div class="home">
    <h1>Willkommen auf der Chat-Plattform!</h1>
    <div class="chat-list">
      <h2>Verfügbare Chats</h2>
      <ul>
        <li v-for="chat in chats" :key="chat.id">
          <router-link :to="`/chat/${chat.id}`">{{ chat.name }}</router-link>
        </li>
      </ul>
      <button @click="createChat">Neuen Chat erstellen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      chats: [
        { id: 1, name: 'Chat 1' },
        { id: 2, name: 'Chat 2' },
      ]
    };
  },
  methods: {
    createChat() {
      // Erstellen neuer Chat
      console.log("Erstellen eines neuen Chats... (Logik hier implementieren)");
    }
  }
}
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.chat-list {
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
}

.chat-list h2 {
  text-align: center;
}

.chat-list ul {
  list-style: none;
  padding: 0;
}

.chat-list li {
  margin: 10px 0;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
