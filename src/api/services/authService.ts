import type { AxiosInstance } from "axios";

export default function (instance: AxiosInstance) {
  return {
    async login(email: string, password: string) {
      return instance.post("/user/login", { email, password });
    },
    async registration(email: string, password: string) {
      return instance.post("/user/registration", { email, password });
    },
    async logout() {
      return instance.post("/user/logout");
    },
  };
}
