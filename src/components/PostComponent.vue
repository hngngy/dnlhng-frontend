<template>
  <q-page :class="{ 'dark-mode': isDarkMode }" padding>
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

    <q-card v-if="editingPost">
      <q-card-section>
        <q-input outlined v-model="editedUsername" label="Username" />
        <q-input outlined v-model="editedMessage" label="Your Message" />
      </q-card-section>

      <q-card-actions>
        <q-btn color="primary" @click="updatePost">Update</q-btn>
        <q-btn color="negative" @click="cancelEdit">Cancel</q-btn>
      </q-card-actions>
    </q-card>

    <q-list bordered separator>
      <q-item v-for="post in paginatedPosts" :key="post.id" class="q-mb-sm">
        <q-item-section avatar>
          <q-avatar>
            <img :src="generateAvatarUrl(post.username)" alt="Avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ post.username }}</q-item-label>
          <q-item-label caption>{{ post.message }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn dense icon="edit" color="primary" @click="startEdit(post)" v-if="!editingPost" />
          <q-btn
            dense
            icon="delete"
            color="negative"
            @click="deletePost(post.id)"
            v-if="!editingPost"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-pagination v-if="totalPages > 1" v-model="currentPage" :max="totalPages" />
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
      editedUsername: '',
      editedMessage: '',
      editingPost: null,
      posts: [],
      currentPage: 1,
      postsPerPage: 10
    }
  },
  computed: {
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.postsPerPage
      return this.posts.slice(startIndex, startIndex + this.postsPerPage)
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.postsPerPage)
    }
  },
  methods: {
    loadPosts() {
      axios
        .get(`${baseUrl}/posts`)
        .then((response) => {
          this.posts = response.data.sort((a, b) => b.id - a.id) // Sortiert die Posts nach ID absteigend
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
        .then((response) => {
          this.posts.unshift(response.data)
          this.username = ''
          this.message = ''
        })
        .catch((error) => console.error('Error creating post:', error))
    },
    startEdit(post) {
      this.editingPost = post
      this.editedUsername = post.username
      this.editedMessage = post.message
    },
    updatePost() {
      const updatedPost = {
        id: this.editingPost.id,
        username: this.editedUsername,
        message: this.editedMessage
      }
      axios
        .put(`${baseUrl}/posts/${updatedPost.id}`, updatedPost)
        .then((response) => {
          const index = this.posts.findIndex((post) => post.id === updatedPost.id)
          if (index !== -1) {
            this.posts.splice(index, 1, response.data)
            this.cancelEdit() // Beendet den Bearbeitungsmodus
          }
        })
        .catch((error) => console.error('Error updating post:', error))
    },
    cancelEdit() {
      this.editingPost = null
      this.editedUsername = ''
      this.editedMessage = ''
    },
    formatTimestamp(timestamp) {
      return new Date(timestamp).toLocaleString() // Hier kannst du die Darstellung des Zeitstempels anpassen
    },
    generateAvatarUrl(username) {
      let hash = 0
      for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash)
      }
      const color = (hash & 0x00ffffff).toString(16).toUpperCase()
      return `https://via.placeholder.com/48x48/${color}/FFFFFF?text=${username.charAt(0).toUpperCase()}`
    }
  },
  mounted() {
    this.loadPosts()
  }
}
</script>

<style scoped>
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
