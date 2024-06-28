<template>
  <div>
    <h1>Posts</h1>
    <form>
      <input type="text" placeholder="Username" v-model="username" />
      <input type="text" placeholder="Your Message" v-model="message" @keyup.enter="createPost()" />
      <button type="button" @click="createPost()">Share</button>
    </form>
    <table>
      <tr>
        <th>Username</th>
        <th>Message</th>
      </tr>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.username }}</td>
        <td>({{ post.message }})</td>
        <td>
          <button @click="deletePost(post.id)" class="delete">delete</button>
        </td>
      </tr>
    </table>
  </div>
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
      //const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
      //const endpoint = baseUrl + '/posts'
      /**const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(`${baseUrl}/posts`, requestOptions)
        .then((response) => response.json())
        .then((result) =>
          result.forEach((post) => {
            this.posts.push(post)
          })
        )
        .catch((error) => console.log('error', error))

        */
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
        .then(() => (this.posts.value = this.posts.value.filter((h) => h.id !== id)))
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
        .then((response) => this.posts.value.push(response.data))
        .catch((error) => console.log(error))
    }
  },
  mounted() {
    this.loadPosts()
  }
}
</script>
