<template>
  <div>
    <h1>Posts</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Message</th>
      </tr>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>{{ post.username }}</td>
        <td>({{ post.message }})</td>
      </tr>
    </table>
  </div>
</template>

<script>
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
      const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
      const endpoint = baseUrl + '/posts'
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) =>
          result.forEach((post) => {
            this.posts.push(post)
          })
        )
        .catch((error) => console.log('error', error))
    },
    mounted() {
      this.loadPosts()
    }
  }
}
</script>
