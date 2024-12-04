<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { IEstate } from '../../../types';

defineProps<{ estates: IEstate[]; searchQuery: string }>();
defineEmits(['filter-by-city']);

const highlightMatch = (text: string, query: string): string => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Адрес</th>
        <th>Город</th>
        <th>Тип</th>
        <th>Цена</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="estate in estates" :key="estate.id">
        <td v-html="highlightMatch(estate.address, searchQuery)"></td>
        <td>
          <div class="city">
            {{ estate.city }}
            <button @click="$emit('filter-by-city', estate.city)">⚙️</button>
          </div>
        </td>
        <td>
          <span v-if="estate.type === 'apartment'">Квартира</span>
          <span v-else-if="estate.type === 'house'">Дом</span>
          <span v-else-if="estate.type === 'commercial'">
            Коммерческая недвижимость
          </span>
          <span v-else>Неизвестно</span>
        </td>
        <td>{{ estate.price }} ₽</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.city {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.75em;
}

button:hover {
  color: blue;
  text-decoration: underline;
}

.highlight {
  background-color: yellow;
}
</style>
