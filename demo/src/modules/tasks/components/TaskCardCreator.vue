<template>
  <div
    class="task-card"
    tabindex="0"
    ref="dialog"
    @click.self="closeDialog"
    @keydown.esc="closeDialog"
  >
    <section class="task-card__wrapper">
      <!--      Кнопка закрытия диалога задачи-->
      <button class="task-card__close" type="button" @click="closeDialog" />

      <!--      Блок ввода имени и удаления задачи-->
      <div class="task-card__block">
        <div class="task-card__row">
          <!--          Поле ввода имени задачи-->
          <input
            v-model="task.title"
            type="text"
            name="task_name"
            class="task-card__name"
            max="37"
          />
          <!--          Кнопка удаления задачи-->
          <a
            v-if="taskToEdit"
            class="task-card__edit task-card__edit--red"
            @click="deleteTask"
          >
            Удалить Задачу
          </a>
        </div>
        <!--        Ошибка валидации поля ввода имени -->
        <span v-if="validations.title.error" class="task-card__error-text">
          {{ validations.title.error }}
        </span>
      </div>

      <!--Блок статуса задачи-->
      <div class="task-card__status">
        <h4 class="task-card__title">Выберите статус:</h4>

        <!--Список статусов задачи-->
        <ul class="meta-filter task-card__meta">
          <li
            v-for="{ value, label } in statusList"
            :key="value"
            class="meta-filter__item"
            :class="{ active: value === taskStatuses[task.statusId] }"
            @click="setStatus(value)"
          >
            <a
              class="meta-filter__status"
              :class="`meta-filter__status--${value}`"
              :title="label"
            />
          </li>
        </ul>
      </div>

      <!--      Блок даты выполнения задачи-->
      <div v-if="task.id" class="task-card__block">
        <p class="task-card__date">
          {{ useTaskCardDate(task) }}
        </p>
      </div>

      <!--      Блок ввода пользователя и даты срока выполнения-->
      <div class="task-card__block">
        <ul class="task-card__params">
          <!--          Блок выбора пользователя-->
          <tasks-card-creator-user-selector v-model="task.userId" />
          <!--          Блок выбора даты выполнения-->
          <tasks-card-creator-due-date-selector v-model="task.dueDate" />
        </ul>
      </div>

      <!--      Блок описания задачи-->
      <div class="task-card__block">
        <div class="task-card__description">
          <h4 class="task-card__title">Описание</h4>
          <textarea
            v-model="task.description"
            name="task_description"
            placeholder="Добавьте описание к задаче"
          />
        </div>
      </div>

      <!--      Блок внешней ссылки-->
      <div class="task-card__block">
        <div class="task-card__links">
          <h4 class="task-card__title">Ссылки</h4>

          <div class="task-card__links-item">
            <!--            Поле ввода ссылки-->
            <input
              v-model="task.url"
              type="text"
              name="task_link_url"
              placeholder="Введите url"
            />
            <!--            Ошибка валидации поля ввода ссылки-->
            <span v-if="validations.url.error" class="task-card__error-text">
              {{ validations.url.error }}
            </span>
            <!--            Описание ссылки-->
            <input
              v-model="task.urlDescription"
              type="text"
              name="task_link_desc"
              placeholder="Добавьте описание к ссылке"
            />
          </div>
        </div>
      </div>

      <!--      Блок подзадач-->
      <div class="task-card__block">
        <!--        Список подзадач-->
        <task-card-view-ticks-list
          :ticks="task.ticks"
          @createTick="createTick"
          @updateTick="updateTick"
          @removeTick="removeTick"
        />
      </div>

      <!--      Блок тегов-->
      <div class="task-card__block">
        <!--        Компонент создания тегов-->
      </div>

      <!--      Блок сохранения и отмены изменений-->
      <div class="task-card__buttons">
        <!--        Кнопка отмены изменений-->

        <!--        Кнопка сохранения изменений-->
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { cloneDeep } from "lodash";

import { createUUIDv4, createNewDate } from "@/common/helpers";
import { STATUSES } from "@/common/constants";
import { useTaskCardDate } from "@/common/composables";
import taskStatuses from "@/common/enums/taskStatuses";

import TaskCardViewTicksList from "./TaskCardViewTicksList.vue";
import TasksCardCreatorUserSelector from "./TaskCardCreatorUserSelector.vue";
import TasksCardCreatorDueDateSelector from "./TaskCardCreatorDueDateSelector.vue";

const props = defineProps({
  taskToEdit: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(["addTask", "editTask", "deleteTask"]);

// Функция для создания новых задач
const createNewTask = () => ({
  userId: null,
  columnId: null,
  statusId: null,
  title: "Название задачи",
  description: "",
  sortOrder: 0,
  dueDate: createNewDate(),
  url: "",
  urlDescription: "",
  ticks: [],
  tags: "",
});

const createNewTick = () => ({
  // Добавляем временный идентификатор до момента отправки на сервер
  uuid: createUUIDv4(),
  taskId: null,
  text: "",
  done: false,
});

// Определяем, если мы работаем над редактированием задачи или создаём новую
const taskToWork = props.taskToEdit
  ? cloneDeep(props.taskToEdit)
  : createNewTask();

const task = ref(taskToWork);
const router = useRouter();
const dialog = ref(null);

const setEmptyValidations = () => ({
  title: {
    error: "",
    rules: ["required"],
  },
  url: {
    error: "",
    rules: ["url"],
  },
});

const validations = ref(setEmptyValidations());

const statusList = ref(STATUSES.slice(0, 3));

onMounted(() => {
  // Фокусируем на диалоговом окне, чтобы сработала клавиша Esc без дополнительного клика на окне
  dialog.value.focus();
});

function setStatus(status) {
  const [key] = Object.entries(taskStatuses).find(
    ([_, value]) => value === status,
  );
  const taskStatus = task.value.statusId;
  if (!taskStatus || taskStatus !== +key) {
    task.value.statusId = +key;
  } else {
    task.value.statusId = null;
  }
}

function createTick() {
  task.value.ticks.push(createNewTick());
}

// Используем uuid для новых подзадач, id для существующих
function updateTick(tick) {
  const index = task.value.ticks.findIndex(({ uuid, id }) => {
    if (uuid) {
      return tick.uuid === uuid;
    }
    if (id) {
      return tick.id === id;
    }
    return false;
  });
  if (~index) {
    // bitwise NOT (~) operator
    task.value.ticks.splice(index, 1, tick);
  }
}

function removeTick({ uuid, id }) {
  if (uuid) {
    task.value.ticks = task.value.ticks.filter((tick) => tick.uuid !== uuid);
  }
  if (id) {
    task.value.ticks = task.value.ticks.filter((tick) => tick.id !== id);
  }
}

function closeDialog() {
  // Закрытие диалога, всего лишь переход на корневой маршрут
  router.push("/");
}

function deleteTask() {
  emits("deleteTask", task.value.id);
  router.push("/");
}
</script>
