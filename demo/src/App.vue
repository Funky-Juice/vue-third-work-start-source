<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "./layouts";
import { useTasksStore, useColumnsStore, useUsersStore } from "./stores";

// Определяем хранилища
const tasksStore = useTasksStore();
const usersStore = useUsersStore();
const columnsStore = useColumnsStore();

// Загрузка первоначальных данных
// Загружаем задачи
void tasksStore.fetchTasks();
// Загружаем пользователей
void usersStore.fetchUsers();
// Загружаем колонки
void columnsStore.fetchColumns();
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}
</style>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
