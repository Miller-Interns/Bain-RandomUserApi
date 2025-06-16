import type { PaginatedUserResponse } from '@/types/PaginatedUserResponse'
import type { User } from '@/types/User'
import { onBeforeMount, ref } from 'vue'

import { useUsersStore } from '@/stores/usersStore'

import type { PaginatedUserInfo } from '@/types/PaginatedUserInfo'
export function useUsers() {
  const PAGE_SIZE = 10
  const API_URL = 'https://randomuser.me/api/'

  const store = useUsersStore()

  const info = ref<PaginatedUserInfo | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function mapUser(user: any): User {
    return {
      id: user.id.value,
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      email: user.email,
      picture: user.picture.large,
      cellphone: user.cell,
      phone: user.phone,
      nationality: user.nat,
      gender: user.gender,
    }
  }

  async function getPaginatedUsers(
    page: number = 0,
    pageSize: number = PAGE_SIZE,
  ): Promise<PaginatedUserResponse | null> {
    const pageExists = Object.prototype.hasOwnProperty.call(store.usersByPage, page)
    console.log(' useUsers ~ store.usersByPage:', store.usersByPage)
    console.log(' useUsers ~ pageExists:', pageExists)

    if (pageExists) {
      if (!info.value) throw new Error('info is null')
      const { seed, version } = info.value

      const res = {
        results: store.usersByPage[page],
        info: {
          seed,
          results: store.usersByPage[page].length,
          page: page,
          version,
        },
      }
      // TODO: remve
      console.log(' useUsers ~ res:', res)

      return res
    }

    const response = await fetch(`${API_URL}?page=${page}&results=${pageSize}`)
    const data = await response.json()
    console.log(' useUsers ~ data:', data)

    if (!data) return null

    if (info.value === null) info.value = data.info
    if (!info.value) throw new Error('info is null')

    const mappedUsers = data.results.map(mapUser)
    store.setUsersForPage(page, mappedUsers)

    return {
      results: mappedUsers,
      info: info.value,
    }
  }

  function resetStore() {
    store.usersByPage = {}
  }

  onBeforeMount(() => {
    resetStore()
  })

  return {
    getPaginatedUsers,
    store,
  }
}
