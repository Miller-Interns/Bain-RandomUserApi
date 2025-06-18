<script setup lang="ts">
import type { User } from '@/types/User'

defineProps<{ user: User | null }>()
const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <img :src="user?.picture" alt="User Picture" class="modal-avatar" />
      <h2>{{ user?.name }}</h2>
      <p><strong>Email:</strong> {{ user?.email }}</p>
      <p><strong>Phone:</strong> {{ user?.phone }}</p>
      <p><strong>Cell:</strong> {{ user?.cellphone }}</p>
      <p><strong>Gender:</strong> {{ user?.gender }}</p>
      <p><strong>Nationality:</strong> {{ user?.nationality }}</p>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: rgb(20, 5, 5);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}
.modal-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}
</style>
