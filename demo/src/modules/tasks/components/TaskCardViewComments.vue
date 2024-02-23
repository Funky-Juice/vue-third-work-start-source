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
    </div>
  </div>
</template>

<script setup>
import { getImage } from "@/common/helpers";

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
</script>
