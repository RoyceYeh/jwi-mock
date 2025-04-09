<script setup>
const props = defineProps({
  news: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li class="list">
    <router-link :to="`/news/${news.id}`">
      <div class="pic">
        <div class="bg" :style="{ backgroundImage: `url('${news.image}')` }"></div>
      </div>
      <div class="date">{{ news.date }}</div>
      <p>{{ news.title }}</p>
    </router-link>
  </li>
</template>
