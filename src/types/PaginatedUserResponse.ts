import type { PaginatedUserInfo } from './PaginatedUserInfo'

export type PaginatedUserResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[] // allowing any here since randomuser.me api schema might change
  info: PaginatedUserInfo
}
