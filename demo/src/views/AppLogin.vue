<template>
  <div class="sign-form sign-in">
    <!--    Шапка формы входа-->
    <div class="sign-form__header">
      <router-link
          to="/"
          class="logo"
      >
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

    <h3 class="sign-form__title">
      Войти
    </h3>
    <!--    Форма входа-->
    <form
        class="sign-form__shape"
    >
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

  </div>
  <!--       Поле ошибок сервера-->
  </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AppInput from '@/common/components/AppInput.vue'
import { validateFields, clearValidationErrors } from '@/common/validator'
import { useRouter } from 'vue-router'

const router = useRouter()

const setEmptyValidations = () => ({
  email: {
    error: '',
    rules: ['required', 'email']
  },
  password: {
    error: '',
    rules: ['required']
  }
})

const email = ref('')
const password = ref('')
const validations = ref(setEmptyValidations())

watch(email, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (validations.value.email.error) clearValidationErrors(validations.value)
})

watch(password, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (validations.value.password.error) clearValidationErrors(validations.value)
})
</script>
