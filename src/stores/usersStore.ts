import { defineStore } from 'pinia'

import { useLocalStorage } from '@vueuse/core'

import type { User } from '@/types/User'

export const useUsersStore = defineStore('users', () => {
  const usersByPage = useLocalStorage<Record<number, User[]>>('usersByPage', {})

  function setUsersForPage(pageNumber: number, users: User[]) {
    usersByPage.value[pageNumber] = users
  }

  function getUsersForPage(pageNumber: number): User[] {
    return usersByPage.value[pageNumber] || []
  }

  return {
    usersByPage,
    setUsersForPage,
    getUsersForPage,
  }
})
