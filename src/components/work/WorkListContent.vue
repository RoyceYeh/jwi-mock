<script setup>
const props = defineProps({
  works: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="content">
    <div class="container">
      <ul v-if="works && works.length">
        <li v-for="work in works" :key="work.id" class="list">
          <!-- 使用 to 對象語法，確保 ID 被正確轉換為字符串 -->
          <router-link :to="{ name: 'WorkDetail', params: { id: String(work.id) } }">
            <div class="pic">
              <div class="bg" :style="{ backgroundImage: `url('${work.image}')` }"></div>
            </div>
            <h3>{{ work.title }}</h3>
            <p class="text">{{ work.content }}</p>
            <div class="tags">
              <div v-for="(tag, index) in work.tags" :key="index" class="tag">
                <p>{{ tag }}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <div v-else-if="loading" class="loading">載入中...</div>
      <div v-else class="no-data">目前沒有案例資料</div>
    </div>
  </div>
</template>
