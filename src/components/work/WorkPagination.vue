<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['page-changed'])

// 決定要顯示的頁碼範圍
const displayedPages = computed(() => {
  const maxVisiblePages = 5
  let startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1)

  // 調整起始頁，確保顯示足夠的頁碼
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})

const changePage = (page) => {
  if (page !== props.currentPage) {
    emit('page-changed', page)
  }
}

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-changed', props.currentPage + 1)
  }
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <a class="prev" href="javascript:;" @click.prevent="prevPage" :class="{ disabled: currentPage === 1 }">
      <div class="pic"></div>
    </a>

    <template v-for="page in displayedPages" :key="page">
      <a href="javascript:;" @click.prevent="changePage(page)" :class="{ current: currentPage === page }">
        {{ page }}
      </a>
    </template>

    <a class="next" href="javascript:;" @click.prevent="nextPage" :class="{ disabled: currentPage === totalPages }">
      <div class="pic"></div>
    </a>
  </div>
</template>
