<template>
  <div>
    <h2>Chat</h2>
    <input v-model="benutzername" placeholder="Benutzername" />
    <input v-model="text" placeholder="Nachricht eingeben" @keyup.enter="sendeNachricht" />
    <button @click="sendeNachricht">Senden</button>

    <div id="messagesBox">
      <div v-for="nachricht in nachrichten" :key="nachricht.id" class="message">
        <strong>{{ nachricht.benutzername }}</strong>: {{ nachricht.text }} <div class='timestamp'>{{ nachricht.zeitstempel }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/apiConfig';

export default {
  data() {
    return {
      benutzername: '',
      text: '',
      nachrichten: []
    };
  },
  methods: {
    fetchMessages() {
      fetch(`${API_BASE_URL}/chat`)
        .then(response => response.json())
        .then(data => {
          this.nachrichten = data;
        }).catch(error => {
          console.error('Fehler beim Abrufen der Nachrichten:', error);
        });
    },
    sendeNachricht() {
      const nachricht = {
        benutzername: this.benutzername,
        text: this.text
      };
      fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nachricht)
      })
      .then(() => {
        this.text = '';
        this.fetchMessages();
      })
      .catch(error => {
        console.error('Fehler beim Senden der Nachricht:', error);
      });
    }
  },
  mounted() {
    this.fetchMessages();
  }
};
</script>

<style>
#messagesBox {
  border: 1px solid #000000;
  padding: 10px;
  margin-top: 20px;
  height: 300px;
  overflow-y: auto;
}
.message {
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 5px;
  color: black;
}
.timestamp {
  font-size: 0.8em;
  color: #000000;
}
</style>
