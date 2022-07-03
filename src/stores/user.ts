import { defineStore } from "pinia";
import api from "@/api";

export type User = {
  id: number,
  email: string
}

export const useUser = defineStore({
  id: "user",
  state: () => ({
    user: {
      id: 0,
      email: ""
    } as User,
    isAuth: false
  }),
  getters: {},
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.auth.login(email, password);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.isAuth = true;
        this.user = response.data.user;
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    },
    async registration(email: string, password: string) {
      try {
        const response = await api.auth.registration(
          email,
          password
        );
        localStorage.setItem("user", response.data.user);
        this.isAuth = true;
        this.user = response.data.user;
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    },
    async logout() {
      try {
        await api.auth.logout();
        localStorage.removeItem("token");
        this.isAuth = false;
        // commit("SET_USER");
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    }
  }
});

