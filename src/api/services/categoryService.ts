import type { AxiosInstance } from "axios";

export default function (instance: AxiosInstance) {
  return {
    create(payload: any) {
      return instance.post("/category", payload);
    },
    getAll() {
      return instance.get("/category");
    },
    update(payload: any) {
      return instance.put("/category", payload);
    },
    delete(id: any) {
      return instance.delete(`/category/${id}`);
    },
  };
}
