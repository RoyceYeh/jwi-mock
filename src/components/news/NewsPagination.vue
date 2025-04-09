<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  displayedPages: {
    type: Array,
    required: true,
  },
})

defineEmits(['go-to-page', 'prev-page', 'next-page'])
</script>

<template>
  <div class="pagination">
    <a class="prev" href="javascript:;" @click="$emit('prev-page')" :class="{ disabled: currentPage === 1 }">
      <div class="pic"></div>
    </a>
    <a v-for="page in displayedPages" :key="page" href="javascript:;" @click="$emit('go-to-page', page)" :class="{ current: currentPage === page }">
      {{ page }}
    </a>
    <a class="next" href="javascript:;" @click="$emit('next-page')" :class="{ disabled: currentPage === totalPages }">
      <div class="pic"></div>
    </a>
  </div>
</template>
