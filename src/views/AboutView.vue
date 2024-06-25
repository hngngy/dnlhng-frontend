<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
.about {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  text-align: center;
}

@media (min-width: 1024px) {
  .about {
    padding: 20px;
  }
}
</style>
