<template>
  <div class="login">
    <div class="login__wrapper">
      <span class="login__auth">Авторизация</span>
      <span class="login__not-acc" @click="$emit('showRegistration')">Нету аккаунта?</span>

      <input
        class="login__login-input"
        v-model="state.login.email"
        type="email"
        placeholder="Имя пользователя"
      />
      <input
        class="login__password-input"
        v-model="state.login.password"
        type="password"
        placeholder="Пароль"
      />

      <button class="login__btn" @click="user.login(state.login)">Войти</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useUser } from "@/stores/user";

const user = useUser();

const state = reactive({
  login: {
    email: "",
    password: ""
  }
});

</script>

<style scoped lang="scss">
.login {
  max-width: 610px;
  height: 525px;
  margin: 0 auto;
  position: relative;
  top: -310px;
  left: 0px;
  background: linear-gradient(
      131.98deg,
      rgba(230, 169, 228, 0.7) 0%,
      rgba(155, 201, 255, 0.336) 120.13%
  );
  backdrop-filter: blur(10px);
  border-radius: 46px;

  .login__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 40px;
  }

  .login__auth {
    font-size: 30px;
    line-height: 36px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .login__not-acc {
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 80px;
  }

  input {
    width: 100%;
    height: 31px;
    border-bottom: 1px solid rgba(232, 233, 238, 0.3);
    font: $font-22-27;
    color: #ffffff;
  }

  input::placeholder {
    font: $font-22-27;
    color: rgba(255, 255, 255, 0.5);
  }

  .login__login-input {
    margin-bottom: 60px;
  }

  .login__password-input {
    margin-bottom: 90px;
  }

  .login__btn {
    background: linear-gradient(
        89.46deg,
        rgba(155, 201, 255, 0.6) 0%,
        rgba(230, 169, 228, 0.6) 100%
    );
    border-radius: 19px;
    width: 530px;
    height: 56px;
    font: $font-22-27;
    font-weight: normal;
    color: #ffffff;
  }
}
</style>
