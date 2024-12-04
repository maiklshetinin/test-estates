<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EstatesSearch from './components/EstatesSearch.vue';
import EstatesTable from './components/EstatesTable.vue';
import { getEstates } from '../../api/index.ts';
import { IEstate } from '../../types/index.ts';
//REFS
const estates = ref<IEstate[]>([]);
const searchQuery = ref('');

// Функция для загрузки данных с бэкенда с учетом фильтров и поиска
const loadEstates = async (
  city: string | null = null,
  search: string | null = null
) => {
  const params: { city?: string; search?: string } = {};
  if (city) params.city = city;
  if (search) params.search = search;

  // Получение данных с обработкой ошибок внутри API
  const response = await getEstates(params);
  estates.value = response;
};

const onSearch = (query: string) => {
  searchQuery.value = query;
  loadEstates(null, query);
};
const clearFilter = () => {
  searchQuery.value = '';
  loadEstates();
};

onMounted(async () => await loadEstates());
</script>

<template>
  <header>
    <h1>Список объектов недвижимости</h1>
    <EstatesSearch @search="onSearch" @clear="clearFilter" />
  </header>

  <main>
    <EstatesTable
      :estates="estates"
      :searchQuery="searchQuery"
      @filter-by-city="loadEstates"
    />
  </main>
</template>
