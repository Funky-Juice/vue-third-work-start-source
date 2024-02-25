<template>
  <task-card-creator v-if="task" :task-to-edit="task" />
</template>

<script setup>
import TaskCardCreator from "../modules/tasks/components/TaskCardCreator.vue";
import { useRoute, useRouter } from "vue-router";
import { useTasksStore } from "@/stores";

import { createNewDate } from "../common/helpers";

const route = useRoute();
const router = useRouter();
const tasksStore = useTasksStore();

// Находим задачу из массива задач по id из строки URL
const task = tasksStore.tasks.find((task) => +task.id === +route.params.id);

if (task) {
  const taskDate = task.dueDate;
  task.dueDate = taskDate ? new Date(taskDate) : createNewDate();
} else {
  // Перенаправляем на главную страницу, если задача не найдена
  router.push("/");
}
</script>
