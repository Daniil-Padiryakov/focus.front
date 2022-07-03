<template>
  <div>
    <form-registration
      @showLogin="registrationHandler"
      v-show="state.registration"
    ></form-registration>
    <form-login
      @showRegistration="registrationHandler"
      v-show="!state.registration"
    ></form-login>
  </div>
</template>

<script setup lang="ts">
import FormRegistration from "@/components/FormRegistration.vue";
import FormLogin from "@/components/FormLogin.vue";
import { reactive } from "vue";

const state = reactive({
  registration: false
});

const registrationHandler = () => {
  state.registration = !state.registration;
};
</script>

<style scoped></style>
