<template>
  <header class="header">
    <img class="header__logo" src="../assets/logo.svg" alt="Logo" />
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__list-item">
          <img src="../assets/settings.svg" alt="Settings" />
        </li>
        <li class="nav__list-item">
          <img src="../assets/stats.svg" alt="Statistics" />
        </li>
        <li class="nav__list-item">
          <img src="../assets/avatar.svg" alt="Avatar" />
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <timer-focus></timer-focus>

    <form-category @handlerAuthForm="showAuthForm"></form-category>

    <auth-forms
      v-if="!user.isAuth && state.isShowAuthForm"
      v-click-away="onClickAway"
    ></auth-forms>
  </main>
</template>

<script setup lang="ts">
import TimerFocus from "@/components/TimerFocus.vue";
import FormCategory from "@/components/FormCategory.vue";
import AuthForms from "@/components/AuthForms.vue";
import { useUser } from "@/stores/user";
import { reactive } from "vue";

const user = useUser();
const state = reactive({
  isShowAuthForm: false,
})

const onClickAway = () => {
  state.isShowAuthForm = false;
}

const showAuthForm = () => {
  state.isShowAuthForm = true;
}

</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;

  .nav__list {
    display: flex;

    .nav__list-item:not(:last-child) {
      margin-right: 50px;
    }
  }
}
</style>
