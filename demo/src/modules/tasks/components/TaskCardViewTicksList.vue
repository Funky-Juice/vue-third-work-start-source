<template>
  <div class="task-card__check-list">
    <h4 class="task-card__title">
      Чеклист

      <!--Кнопка создания новой подзадачи-->
      <button
        v-if="!disabled"
        type="button"
        class="task-card__plus"
        @click="$emit('createTick')"
      />
    </h4>
    <!--Список подзадач-->
  </div>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["createTick"]);
</script>
