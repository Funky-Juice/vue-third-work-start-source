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
        @click="$router.push('/')"
      />
    </div>

    <h3 class="sign-form__title">Войти</h3>
    <!--    Форма входа-->
    <form class="sign-form__shape">
      <!--      Поле электронной почты-->

      <!--      Поле пароля-->

      <!--      Кнопка отправки формы-->

      <!--       Поле ошибок сервера-->
    </form>
  </div>
</template>
