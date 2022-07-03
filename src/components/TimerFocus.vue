<template>
  <div class="timer">
    <div class="time">
      <span class="time__numbers" :class="{ 'time__numbers--rest': pomodoro.isRest }">
        {{ pomodoro.isRest ? pomodoro.restTimer : pomodoro.pomodoroTimer }}
      </span>
    </div>

    <div class="btns">
      <button
        v-if="(!pomodoro.isWork && !pomodoro.isRest) || pomodoro.isPause"
        class="start"
        @click="startTimer"
      ></button>
      <button
        v-if="pomodoro.isWork && !pomodoro.isPause"
        class="pause"
        :class="{ 'pause--rest': pomodoro.isRest }"
        @click="pauseTimer"
      ></button>
      <button
        v-if="pomodoro.isWork || pomodoro.isRest || pomodoro.isPause"
        class="stop"
        :class="{ 'stop--rest': pomodoro.isRest }"
        @click="stopTimer"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { usePomodoro } from "@/stores/pomodoro";

const pomodoro = usePomodoro();

const startTimer = () => {
  if (!pomodoro.isWork && !pomodoro.isRest && !pomodoro.isPause) {
    pomodoro.startWork();
  } else {
    pomodoro.resumeWork();
  }
};
const pauseTimer = () => {
  if (pomodoro.isWork) {
    pomodoro.pauseWork();
  }
};
const stopTimer = () => {
  if (pomodoro.isWork || pomodoro.isPause) {
    pomodoro.stopWork();
  } else {
    pomodoro.stopRest();
  }
};
</script>

<style scoped lang="scss">
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 170px;
  margin-bottom: 22px;

  .time__numbers {
    font-family: "Rubik", sans-serif;
    font-weight: 500;
    font-size: 150px;
    line-height: 178px;
    color: #ffffff;

    &--rest {
      color: #86f0b1;
    }
  }
}

.btns {
  :not(:last-child) {
    margin-right: 20px;
  }
}

.start {
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;

  background: linear-gradient(
      263.66deg,
      rgba(230, 169, 228, 0.5) 0%,
      rgba(155, 201, 255, 0.5) 100%
  );
  border-radius: 9px;
  width: 216px;
  height: 50px;

  &::before {
    display: block;
    content: " ";
    background-image: url("../assets/btn-play.svg");
    background-size: 25px 27px;
    height: 27px;
    width: 25px;
    margin: 0 auto;
  }

  &:hover {
    opacity: 0.5;
    transition: 1s linear;
  }
}

.pause {
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;

  background: linear-gradient(
      263.66deg,
      rgba(230, 169, 228, 0.5) 0%,
      rgba(155, 201, 255, 0.5) 100%
  );
  border-radius: 9px;
  width: 216px;
  height: 50px;

  &::before {
    display: block;
    content: " ";
    background-image: url("../assets/pause.svg");
    background-size: 25px 27px;
    height: 27px;
    width: 25px;
    margin: 0 auto;
  }

  &:hover {
    opacity: 0.5;
    transition: 1s linear;
  }

  &--rest {
    background: linear-gradient(
        88.53deg,
        rgba(134, 240, 177, 0.5) 0%,
        rgba(127, 248, 244, 0.5) 206.53%
    );
  }
}

.stop {
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;

  background: linear-gradient(
      263.66deg,
      rgba(230, 169, 228, 0.5) 0%,
      rgba(155, 201, 255, 0.5) 100%
  );
  border-radius: 9px;
  width: 216px;
  height: 50px;

  &::before {
    display: block;
    content: " ";
    background-image: url("../assets/stop.svg");
    background-size: 25px 27px;
    height: 27px;
    width: 25px;
    margin: 0 auto;
  }

  &:hover {
    opacity: 0.5;
    transition: 1s linear;
  }

  &--rest {
    background: linear-gradient(
        88.53deg,
        rgba(134, 240, 177, 0.5) -106.53%,
        rgba(127, 248, 244, 0.5) 100%
    );
  }
}
</style>
