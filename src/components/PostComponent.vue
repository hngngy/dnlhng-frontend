<template>
  <q-page padding>
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Blackboard</div>
      </q-card-section>

      <q-card-section>
        <q-input outlined v-model="username" label="Username" />
        <q-input outlined v-model="message" label="Your Message" @keyup.enter="createPost()" />
      </q-card-section>

      <q-card-actions class="share-button">
        <q-btn color="primary" @click="createPost">Share</q-btn>
      </q-card-actions>
    </q-card>

    <q-list bordered separator>
      <q-item v-for="post in posts" :key="post.id" class="q-mb-sm">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://placehold.jp/48x48.png" alt="Avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ post.username }}</q-item-label>
          <q-item-label caption>{{ post.message }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn dense icon="delete" color="negative" @click="deletePost(post.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      message: '',
      posts: []
    }
  },
  methods: {
    loadPosts() {
      axios
        .get(`${baseUrl}/posts`)
        .then((response) => {
          this.posts = response.data
        })
        .catch((error) => {
          console.error('Error loading posts:', error)
        })
    },
    deletePost(id) {
      axios
        .delete(`${baseUrl}/posts/${id}`)
        .then(() => (this.posts = this.posts.filter((post) => post.id !== id)))
        .catch((error) => {
          console.error('Error deleting post:', error)
        })
    },
    createPost() {
      const data = {
        username: this.username,
        message: this.message
      }
      axios
        .post(`${baseUrl}/posts`, data)
        .then((response) => this.posts.push(response.data))
        .catch((error) => console.log(error))
    }
  },
  mounted() {
    this.loadPosts()
  }
}
</script>

<style scoped>
form {
  display: flex;
  margin: 0 -16px;

  * {
    margin: 16px;
  }

  input {
    flex-grow: 1;
  }
}

table {
  margin: 8px -8px 0;

  th,
  td {
    padding: 8px;
  }
}

button {
  border-radius: 32px;
  padding: 8px;
  border: none;
  cursor: pointer;
  background: #76b900;
  color: white;

  &.delete {
    background: darkred;
    color: white;
  }
}

.q-page {
  max-width: 600px;
  margin: 0 auto;
}

.q-card {
  max-width: 100%;
}

.q-input {
  margin-bottom: 16px;
}

.q-list {
  max-width: 100%;
}

.q-input input {
  color: black;
}

.q-card-actions {
  display: flex;
  justify-content: flex-end;
}

.q-btn {
  margin: 10px;
  width: calc(100% - 20px);
}
</style>
