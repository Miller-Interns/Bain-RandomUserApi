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
  width: 700px;
  margin: 2rem auto;
  padding: 2rem 2rem 1rem;
  background: var(--color-background, #ffffff);
  color: var(--color-text, #181818);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Push content to the top */
  box-sizing: border-box;
}

.dashboard__title {
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1.5rem;
}

.dashboard__user-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
}

.dashboard__user-item {
  font-size: 1rem;
  padding: 0.3rem 0;
  background: none;
  border: none;
  border-radius: 0;
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 1.2;
}

.dashboard__user-item strong {
  font-weight: bold;
}

.dashboard__pagination {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  padding-top: 1rem;
}

.dashboard__pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.dashboard__pagination button:hover:enabled {
  background-color: #e6e6e6;
}

.dashboard__pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
