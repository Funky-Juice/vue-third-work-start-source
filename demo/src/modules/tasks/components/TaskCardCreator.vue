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

          <!--          Кнопка удаления задачи-->
        </div>
        <!--        Ошибка валидации поля ввода имени -->
      </div>

      <!--      Блок статуса задачи-->
      <div class="task-card__status">
        <!--        Список статусов задачи-->
      </div>

      <!--      Блок даты выполнения задачи-->

      <!--      Блок ввода пользователя и даты срока выполнения-->
      <div class="task-card__block">
        <ul class="task-card__params">
          <!--          Блок выбора пользователя-->

          <!--          Блок выбора даты выполнения-->
        </ul>
      </div>

      <!--      Блок описания задачи-->

      <!--      Блок внешней ссылки-->
      <div class="task-card__block">
        <div class="task-card__links">
          <div class="task-card__links-item">
            <!--            Поле ввода ссылки-->

            <!--            Ошибка валидации поля ввода ссылки-->

            <!--            Описание ссылки-->
          </div>
        </div>
      </div>

      <!--      Блок подзадач-->
      <div class="task-card__block">
        <!--        Список подзадач-->
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

const router = useRouter();

const dialog = ref(null);

onMounted(() => {
  // Фокусируем на диалоговом окне, чтобы сработала клавиша Esc без дополнительного клика на окне
  dialog.value.focus();
});

function closeDialog() {
  // Закрытие диалога, всего лишь переход на корневой маршрут
  router.push("/");
}
</script>
