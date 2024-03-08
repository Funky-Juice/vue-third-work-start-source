<template>
  <div class="sign-form sign-in">
    <!--    Шапка формы входа-->
    <div class="sign-form__header">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="VueWork logo"
          width="147"
          height="23"
        />
      </router-link>

      <button
        class="sign-form__close"
        type="button"
        @click="router.push('/')"
      />
    </div>

    <h3 class="sign-form__title">Войти</h3>
    <!--    Форма входа-->
    <form class="sign-form__shape" @submit.prevent="login">
      <!--      Поле электронной почты-->
      <label class="sign-form__input">
        <app-input
          v-model="email"
          type="email"
          name="email"
          class="input"
          placeholder="E-mail"
          :error-text="validations.email.error"
        />
      </label>
      <!--      Поле пароля-->
      <label class="sign-form__input">
        <app-input
          v-model="password"
          type="password"
          name="password"
          class="input"
          placeholder="Пароль"
          :error-text="validations.password.error"
        />
      </label>
      <!--      Кнопка отправки формы-->
      <div class="sign-form__wrap">
        <app-button class="button--primary" type="submit"> Войти </app-button>
      </div>
      <!--       Поле ошибок сервера-->
      <div v-if="serverErrorMessage" class="server-error-message">
        {{ serverErrorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import AppButton from "@/common/components/AppButton.vue";
import AppInput from "@/common/components/AppInput.vue";
import { validateFields, clearValidationErrors } from "@/common/validator";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";

const router = useRouter();
const authStore = useAuthStore();

const setEmptyValidations = () => ({
  email: {
    error: "",
    rules: ["required", "email"],
  },
  password: {
    error: "",
    rules: ["required"],
  },
});

const email = ref("");
const password = ref("");
const validations = ref(setEmptyValidations());
const serverErrorMessage = ref(null);

watch(email, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value) serverErrorMessage.value = null;
  if (validations.value.email.error) clearValidationErrors(validations.value);
});

watch(password, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value) serverErrorMessage.value = null;
  if (validations.value.password.error)
    clearValidationErrors(validations.value);
});

async function login() {
  if (
    !validateFields(
      { email: email.value, password: password.value },
      validations.value,
    )
  ) {
    return;
  }
  const responseMessage = await authStore.login(email.value, password.value);
  // Проверяем, если возвращается статус не 'ok', то показываем ошибку сервера
  if (responseMessage !== "ok") {
    serverErrorMessage.value = responseMessage;
  } else {
    // Получаем данные пользователя
    await authStore.getMe();
    // Если логин без ошибок, перенаправляем на главную страницу
    await router.push("/");
  }
}
</script>
