<template>
  <div class="registration">
    <div class="registration__wrapper">
      <span class="registration_create-acc" @click="$emit('showLogin')"
      >Создать аккаунт</span
      >

      <!--      <input-->
      <!--        class="registration__input"-->
      <!--        v-model="state.registration.name"-->
      <!--        type="text"-->
      <!--        placeholder="Имя"-->
      <!--      />-->
      <!--      <input-->
      <!--        class="registration__input"-->
      <!--        v-model="state.registration.surname"-->
      <!--        type="text"-->
      <!--        placeholder="Фамилия"-->
      <!--      />-->
      <input
        class="registration__input"
        v-model="state.registration.email"
        type="email"
        placeholder="Email"
      />
      <input
        class="registration__input"
        v-model="state.registration.password"
        type="password"
        placeholder="Пароль"
      />
      <!--      <input-->
      <!--        class="registration__input"-->
      <!--        v-model="state.registration.repeatPassword"-->
      <!--        type="password"-->
      <!--        placeholder="Повторите пароль"-->
      <!--      />-->

      <button
        class="registration__btn"
        @click="user.registration(...state.registration)"
      >
        Создать
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useUser } from "@/stores/user";

const user = useUser();

const state = reactive({
  registration: {
    email: "",
    password: ""
  }
});
</script>

<style scoped lang="scss">
.registration {
  max-width: 610px;
  height: 631px;
  margin: 0 auto;
  position: relative;
  top: -310px;
  left: 0;
  background: linear-gradient(
      131.98deg,
      rgba(230, 169, 228, 0.7) 0%,
      rgba(155, 201, 255, 0.336) 120.13%
  );
  backdrop-filter: blur(10px);
  border-radius: 46px;

  .registration__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 40px;
  }

  .registration_create-acc {
    margin-top: 30px;
    margin-bottom: 50px;
    font-size: 30px;
    line-height: 36px;
    cursor: pointer;

    &::before {
      position: relative;
      display: inline-block;
      content: "";
      background-image: url("../assets/left.svg");
      background-repeat: no-repeat;
      height: 19px;
      width: 9px;
      margin-right: 20px;
      top: -2px;
    }
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

  .registration__input {
    margin-bottom: 40px;
  }

  .registration__btn {
    margin-top: 60px;
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
