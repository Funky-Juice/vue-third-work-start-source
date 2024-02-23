<template>
  <div
    class="task-card"
    tabindex="0"
    ref="dialog"
    @click.self="closeDialog"
    @keydown.esc="closeDialog"
  >
    <section class="task-card__wrapper">
      <!--Закрытие задачи-->
      <button class="task-card__close" type="button" @click="closeDialog" />

      <!--Шапка задачи-->
      <div class="task-card__block">
        <div class="task-card__row">
          <!--Наименование задачи-->
          <h1 class="task-card__name task-card__name--min">
            {{ task ? task.title : "" }}
          </h1>
          <!--Кнопка редактирования задачи-->
          <a
            class="task-card__edit"
            @click="
              router.push({
                name: 'TaskEdit',
                params: { id: $route.params.id },
              })
            "
          >
            Редактировать задачу
          </a>
        </div>
        <!--Дата создания задачи-->
        <p class="task-card__date">
          {{ useTaskCardDate(task) }}
        </p>
      </div>

      <!--Участник задачи и срок выполнения-->
      <div class="task-card__block">
        <ul class="task-card__params">
          <!--Участник задачи-->
          <li v-if="task && task.user">
            Участник:
            <div class="task-card__participant">
              <button type="button" class="task-card__user">
                <img :src="getImage(task.user.avatar)" :alt="task.user.name" />
                {{ task.user.name }}
              </button>
            </div>
          </li>
          <!--Срок выполнения-->
          <li v-if="dueDate">
            Срок:
            <button type="button" class="task-card__date-link">
              {{ dueDate }}
            </button>
          </li>
        </ul>
      </div>

      <!--Описание задачи-->
      <div class="task-card__block">
        <div v-if="task && task.description" class="task-card__description">
          <h4 class="task-card__title">Описание</h4>
          <p>{{ task.description }}</p>
        </div>
      </div>
      <!--Дополнительная ссылка-->
      <div v-if="task && task.url" class="task-card__block task-card__links">
        <h4 class="task-card__title">Ссылки</h4>

        <div class="task-card__links-item">
          <a :href="task.url" target="_blank">
            {{ task.urlDescription || "ссылка" }}
          </a>
        </div>
      </div>

      <!--Чек-лист-->

      <div
        v-if="task && task.tags && task.tags.length"
        class="task-card__block"
      >
        <h4 class="task-card__title">Метки</h4>
        <task-card-tags :tags="task.tags" />
      </div>

      <!--Комментарии-->
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getReadableDate, getImage } from "../common/helpers";

import { useTaskCardDate } from "../common/composables";
import TaskCardTags from "../modules/tasks/components/TaskCardTags.vue";

const router = useRouter();
const route = useRoute();
const dialog = ref(null);

// Передадим все задачи в компонент
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const dueDate = computed(() => {
  return getReadableDate(task.value.dueDate || "");
});

const task = computed(() => {
  return props.tasks.find((task) => task.id == route.params.id);
});

onMounted(() => {
  // Фокусируемся на диалоговом окне, чтобы сработала клавиша Esc без дополнительного клика на окне
  dialog.value.focus();
});

const closeDialog = function () {
  router.push("/");
};
</script>
