<template>
  <div class="search-bar">
    <input
      v-model="searchInput"
      type="text"
      placeholder="Поиск по адресу"
      @input="$emit('search', searchInput)"
    />
    <button @click="$emit('clear')">Очистить фильтры</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Локальное состояние для строки поиска
const searchInput = ref('');

// Определение событий
defineEmits<{
  (e: 'search', query: string): void;
  (e: 'clear'): void;
}>();
</script>

<style scoped>
.search-bar {
  display: flex;
  margin-bottom: 16px;
}

input {
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-right: 10px;
}

button {
  outline: none;
}
</style>
