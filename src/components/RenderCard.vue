<template>
  <div class="container my-4">
    <div class="row g-4">
      <div class="col-12 col-sm-6 col-md-3" v-for="item in paginatedItems" :key="item.id">
        <ToDoCard
          :id="item.id"
          :title="item.title"
          :description="item.description"
          :startDate="item.startDate"
          :endDate="item.endDate"
          :status="item.status"
          :priority="item.priority"
          @reload="reload"
        >
        </ToDoCard>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li
            class="page-item"
            :class="['page-item', { active: page === currentPage }]"
            v-for="page in pageCount"
            :key="page"
          >
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup>
import ToDoCard from './ToDoCard.vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
const router = useRouter()
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['reload'])
const ItemsPerPage = ref(8)
const pageCount = computed(() => Math.ceil(props.items.length / ItemsPerPage.value))
const currentPage = ref(1)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * ItemsPerPage.value
  const end = start + ItemsPerPage.value
  return props.items.slice(start, end)
})
const changePage = (page) => {
  currentPage.value = page
}
const reload = () => {
  emit('reload')
}
</script>
