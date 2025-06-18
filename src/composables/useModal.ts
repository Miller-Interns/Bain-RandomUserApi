// src/composables/useModal.ts
import { ref } from 'vue'
import type { User } from '@/types/User'

export function useModal() {
  const showModal = ref(false)
  const selectedUser = ref<User | null>(null)

  function openModal(user: User) {
    selectedUser.value = user
    showModal.value = true
  }

  function closeModal() {
    selectedUser.value = null
    showModal.value = false
  }

  return {
    showModal,
    selectedUser,
    openModal,
    closeModal,
  }
}
