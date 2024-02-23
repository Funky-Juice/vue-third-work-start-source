<template>
  <div class="task-card__comments">
    <h2 class="task-card__title">Комментарии</h2>
    <div class="comments">
      <!--      Список комментариев-->
      <ul class="comments__list">
        <li
          v-for="comment in comments"
          :key="comment.id"
          class="comments__item"
        >
          <div class="comments__user">
            <img
              :src="getImage(comment.user.avatar)"
              :alt="comment.user.name"
              width="30"
              height="30"
            />
            {{ comment.user.name }}
          </div>
          <p>{{ comment.text }}</p>
        </li>
      </ul>

      <!--      Блок добавления нового комментария-->
      <form v-if="user" action="#" class="comments__form" method="post">
        <app-textarea
          v-model="newComment"
          name="comment_text"
          placeholder="Введите текст комментария"
          :error-text="validations.newComment.error"
        />
        <app-button
          class="comments__form__button"
          :type="'submit'"
          @click.prevent="submit"
        >
          Написать комментарий
        </app-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { getImage } from "@/common/helpers";
import {
  validateFields,
  clearValidationErrors,
} from "../../../common/validator";

import users from "@/mocks/users.json";

import AppTextarea from "@/common/components/AppTextarea.vue";
import AppButton from "@/common/components/AppButton.vue";

const props = defineProps({
  taskId: {
    type: Number,
    required: true,
  },
  comments: {
    type: Array,
    default: () => [],
  },
});

const newComment = ref("");
const validations = ref({
  newComment: {
    error: "",
    rules: ["required"],
  },
});

const user = computed(() => users[0]);

// Отслеживаем значение поля комментария и очищаем ошибку при изменении
watch(newComment, () => {
  if (validations.value.newComment.error) {
    clearValidationErrors(validations.value);
  }
});

const emits = defineEmits(["createNewComment"]);

const submit = function () {
  // Проверяем, валидно ли поле комментария
  if (!validateFields({ newComment }, validations.value)) return;
  // Создаём объект комментария
  const comment = {
    text: newComment.value,
    taskId: props.taskId,
    userId: user.value.id,
    user: {
      id: user.value.id,
      name: user.value.name,
      avatar: user.value.avatar,
    },
  };
  // Отправляем комментарий в родительский компонент
  emits("createNewComment", comment);
  // Очищаем поле комментария
  newComment.value = "";
};
</script>
