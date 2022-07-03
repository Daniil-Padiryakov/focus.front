import type { AxiosInstance } from "axios";

export default function (instance: AxiosInstance) {
  return {
    create(payload: any) {
      return instance.post("/pomodoro", payload);
    },
    getAll() {
      return instance.get("/pomodoro");
    },
  };
}
