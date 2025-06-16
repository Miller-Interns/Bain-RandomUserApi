<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'
import type { PaginatedUserResponse } from '@/types/PaginatedUserResponse'
import type { User } from '@/types/User'
import { onBeforeMount, ref, watch } from 'vue'
import UserModal from '@/components/UserModal.vue'
import { useModal } from '@/composables/useModal'

const page = ref(1)
const users = ref<User[]>([])

const { getPaginatedUsers } = useUsers()
const { showModal, selectedUser, openModal, closeModal } = useModal()

onBeforeMount(async () => {
  const response: PaginatedUserResponse | null = await getPaginatedUsers(page.value)

  if (!response) return

  users.value = response.results
})

watch(page, async () => {
  const response: PaginatedUserResponse | null = await getPaginatedUsers(page.value)

  if (!response) return

  users.value = response.results
})
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">User Dashboard</h1>

    <ul class="dashboard__user-list">
      <!-- TODO: add the modal -->
      <li
        v-for="user in users"
        :key="user.id"
        class="dashboard__user-item"
        @click="openModal(user)"
      >
        {{ user.name }}
      </li>
    </ul>

    <div class="dashboard__pagination">
      <button @click="page--" :disabled="page === 1">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="page++">Next</button>
    </div>
    <UserModal v-if="showModal" :user="selectedUser" @close="closeModal" />
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dashboard__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.dashboard__user-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.dashboard__user-item {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.dashboard__pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
