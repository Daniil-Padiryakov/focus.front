import { defineStore } from "pinia";
import api from "@/api";
import { useUser } from "@/stores/user";

export type Category = {
  title: string,
  user_id: number,
  isEdit?: boolean
}

export const useCategory = defineStore({
  id: "category",
  state: () => ({
    categories: [] as Category[],
    currentCategory: {} as Category
  }),
  getters: {},
  actions: {
    async getCategories() {
      try {
        const response = await api.category.getAll();
        for (let i = 0; i < response.data; i++) {
          response.data.isEdit = false;
        }
        this.categories = response.data;
        this.currentCategory = this.categories[0];
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    },
    async addCategory(title: string) {
      try {
        const user = useUser();
        const newCategory: Category = {
          title: title,
          user_id: user.user.id
        };
        await api.category.create(newCategory);
        this.categories.push(newCategory);
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    },
    async updateCategory(category: Category) {
      delete category.isEdit;
      try {
        await api.category.update(category);
        await this.getCategories();
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    },
    async deleteCategory(id: number) {
      try {
        await api.category.delete(id);
        await this.getCategories();
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    },
    changeCategory(category: Category) {
      this.currentCategory = category;
    }
  }
});

