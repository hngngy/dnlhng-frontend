<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id" class="posts">
        {{ post.username }} {{ post.message }}
      </li>
    </ul>
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
