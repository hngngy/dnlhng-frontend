<template>
  <div>
    <h2>Welcome to {{ $route.params.name }}</h2>
    <!-- Chat-Funktionalität hier einfügen -->
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>
