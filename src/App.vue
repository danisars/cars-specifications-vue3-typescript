<template>
  <section>
    <div class="my-6 mx-auto px-4 lg:px-0 w-full ld:w-[1000px]">
      <div class="flex flex-col lg:flex-row gap-x-10 justify-center">
        <List />

        <Form />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import List from "./components/List.vue";
import Form from "./components/Form.vue";
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
