<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import apiClient from '../api/index';

// Список объектов недвижимости
const estates = ref([]);
// Текущий фильтр по городу
const selectedCity = ref<string | null>(null);
// Поисковый запрос
const searchQuery = ref<string>('');

// Функция для загрузки данных с бэкенда с учетом фильтров и поиска
const loadEstates = async (
  city: string | null = null,
  search: string | null = null
) => {
  try {
    const params: { city?: string; search?: string } = {};
    if (city) params.city = city;
    if (search) params.search = search;

    const response = await apiClient.get('/estates', { params });
    estates.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке объектов недвижимости:', error);
  }
};

// Загрузка данных при монтировании компонента
onMounted(() => {
  loadEstates();
});

// Сброс фильтров и поиска
const clearFilter = () => {
  selectedCity.value = null;
  searchQuery.value = '';
  loadEstates();
};

// Подсветка совпадений в адресах
const highlightMatch = (text: string, query: string): string => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};
</script>

<template>
  <div>
    <h1>Список объектов недвижимости</h1>

    <!-- Поисковый input и кнопка очистки -->
    <div style="margin-bottom: 16px">
      <input
        type="text"
        placeholder="Поиск по адресу"
        v-model="searchQuery"
        @input="
          () => {
            selectedCity = null; // Сброс фильтра города при поиске
            loadEstates(null, searchQuery);
          }
        "
      />
      <button @click="clearFilter">Очистить фильтры</button>
    </div>

    <!-- Таблица -->
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
            {{ estate.city }}
            <button @click="loadEstates(estate.city)">⚙️</button>
          </td>
          <td>
            <span v-if="estate.type === 'apartment'">Квартира</span>
            <span v-else-if="estate.type === 'house'">Дом</span>
            <span v-else-if="estate.type === 'commercial'"
              >Коммерческая недвижимость</span
            >
            <span v-else>Неизвестно</span>
          </td>
          <td>{{ estate.price }} ₽</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Простые стили для таблицы */
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

button {
  margin-left: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
  color: blue;
  text-decoration: underline;
}

/* Подсветка совпадений */
.highlight {
  background-color: yellow;
}
</style>
