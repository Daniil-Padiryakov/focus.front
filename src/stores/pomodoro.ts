import { defineStore } from "pinia";
import api from "@/api";
import { useUser } from "@/stores/user";
import axios from "axios";

export type Pomodoro = {
  duration: number,
  user_id: number
  category_id: number
}

const timeFormatting = (time: number) => {
  const minutes = parseInt(String(time / 60));
  const seconds = time % 60;

  const zeroAddMinutes = ("0" + minutes).slice(-2);
  const zeroAddSeconds = ("0" + seconds).slice(-2);

  return `${zeroAddMinutes}:${zeroAddSeconds}`;
};

export const usePomodoro = defineStore({
  id: "pomodoro",
  state: () => ({
    pomodoros: [] as Pomodoro[],
    pomodoroDuration: 25,

    currentTimeSecondsWork: 3,
    currentTimeSecondsRest: 3,
    intervalWork: undefined as number | undefined,
    intervalRest: undefined as number | undefined,
    isWork: false,
    isRest: false,
    isPause: false,
    worksInSeries: 0,
    secondsForResetWork: 0,
    secondsForResetRest: 0
  }),
  getters: {
    pomodoroTimer: (state) => timeFormatting(state.currentTimeSecondsWork),
    restTimer: (state) => timeFormatting(state.currentTimeSecondsRest)
  },
  actions: {
    async addPomodoro() {
      try {
        const user = useUser();
        const newPomodoro = {
          duration: 123,
          user_id: user.user.id,
          category_id: 123
        };
        await api.pomodoro.create(newPomodoro);
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    },
    async startWork() {
      this.isWork = true;
      this.secondsForResetWork = this.currentTimeSecondsWork;
      // проверяем что предыдущий таймер был полностью сброшен
      if (this.intervalWork === undefined) {
        this.intervalWork = setInterval(async () => {
          //запускаем таймер
          this.currentTimeSecondsWork--;

          //остановка таймера
          if (this.currentTimeSecondsWork === 0) {
            this.isWork = false;
            this.isRest = true;
            this.worksInSeries++;

            //сбрасываем таймер
            clearInterval(this.intervalWork);
            this.intervalWork = undefined;

            // ресетаем значение таймера
            this.currentTimeSecondsWork = this.secondsForResetWork;

            await this.addPomodoro();
            this.startRest();
          }
        }, 1000);
      }
    },
    startRest() {
      this.secondsForResetRest = this.currentTimeSecondsRest;

      // после серии сделать большой перерыв и сбросить серию
      if (this.worksInSeries === 4) {
        this.currentTimeSecondsRest = 7;
        this.worksInSeries = 0;
      }

      // проверяем что предыдущий таймер был полностью сброшен
      if (this.intervalRest === undefined) {
        this.intervalRest = setInterval(() => {
          //запускаем таймер
          this.currentTimeSecondsRest--;

          //остановка таймера
          if (this.currentTimeSecondsRest === 0) {
            this.isRest = false;

            //сбрасываем таймер
            clearInterval(this.intervalRest);
            this.intervalRest = undefined;

            // ресетаем значение таймера
            this.currentTimeSecondsRest = this.secondsForResetRest;
          }
        }, 1000);
      }
    },
    async resumeWork() {
      this.isPause = false;
      this.isWork = true;
      if (this.intervalWork === undefined) {
        this.intervalWork = setInterval(async () => {
          //запускаем таймер
          this.currentTimeSecondsWork--;

          //остановка таймера
          if (this.currentTimeSecondsWork === 0) {
            this.isWork = false;
            this.worksInSeries++;

            //сбрасываем таймер
            clearInterval(this.intervalWork);
            this.intervalWork = undefined;

            // ресетаем значение таймера
            this.currentTimeSecondsWork = this.secondsForResetWork;

            await this.addPomodoro();
            this.startRest();
          }
        }, 1000);
      }
    },
    pauseWork() {
      this.isWork = false;
      this.isPause = true;
      clearInterval(this.intervalWork);
      this.intervalWork = undefined;
    },
    stopWork() {
      if (this.isPause) {
        this.isPause = false;
      }
      this.isWork = false;
      //сбрасываем таймер
      clearInterval(this.intervalWork);
      this.intervalWork = undefined;
      this.currentTimeSecondsWork = this.secondsForResetWork;
    },
    async stopRest() {
      this.isRest = false;
      //сбрасываем таймер
      clearInterval(this.intervalRest);
      this.intervalRest = undefined;
      this.currentTimeSecondsRest = this.secondsForResetRest;
    }
  }
});

