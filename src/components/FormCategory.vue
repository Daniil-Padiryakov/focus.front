<template>
  <div class="category">
    <!--        Подсказка для незареганных-->
    <div class="category__not-auth" @click="$emit('handlerAuthForm')" v-if="!user.isAuth">
      Создайте категорию
    </div>

    <div class="category__current-item" v-else-if="user.isAuth && category.currentCategory">
      {{ category.currentCategory.title }}
    </div>

    <div class="category__list-wrapper" v-if="user.isAuth">
      <div class="category__control-form">
        <div
          class="category__select"
          @click="showCategory"
          v-if="initState && category.categories.length >= 2"
        >
          Категории
        </div>

        <img
          class="category__add"
          src="../assets/plus.svg"
          v-if="category.categories.length >= 2"
          @click="showInput"
        />
      </div>

      <ul class="category__list" v-if="initState && state.isShowCategory">
        <input
          class="category__input"
          v-if="state.isShowInput"
          @keyup.enter="addCategory"
          v-model="state.title"
          v-click-away="onClickAway"
          type="text"
          placeholder="Создайте категорию"
        />

        <li
          class="category__list-item"
          @click="category.changeCategory(category)"
          v-for="category in category.categories"
          :key="category.id"
        >
          <span v-on:dblclick="editCategory(category)" v-if="!category.isEdit">
            {{ category.title }}
          </span>
          <input
            type="text"
            v-if="category.isEdit"
            v-model="state.editTitle"
            @keypress.enter="editCategoryDone(category)"
          />
          <img
            src="../assets/delete.svg"
            @dblclick="category.deleteCategory(category.id)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// emits: ["handlerAuthForm"],
import { computed, reactive } from "vue";
import { type Category, useCategory } from "@/stores/category";
import { usePomodoro } from "@/stores/pomodoro";
import { useUser } from "@/stores/user";

const user = useUser();
const category = useCategory();
const pomodoro = usePomodoro();

const state = reactive({
  isShowInput: true,
  isShowCategory: true,
  title: "",
  editTitle: "",
  a: {}
});

const onClickAway = () => {
  if (category.categories.length >= 2) {
    state.isShowInput = false;
  }
};

const showCategory = () => {
  state.isShowCategory = !state.isShowCategory;
};

const showInput = () => {
  state.isShowInput = true;
};

const addCategory = () => {
  // this.ADD_CATEGORY_TO_SERVER(this.title);
  state.title = "";
};

const editCategory = (category: Category) => {
  category.isEdit = true;
  state.editTitle = category.title;
};

const editCategoryDone = (category: Category) => {
  category.title = state.editTitle;
  category.isEdit = false;
  state.editTitle = "";
  // this.UPDATE_CATEGORY(category);
};


const initState = computed(() => {
  return !pomodoro.isWork && !pomodoro.isPause && !pomodoro.isRest;
});

</script>

<style scoped lang="scss">
.category {
  max-width: 1155px;
  margin: 0 auto;
}

.category__not-auth {
  width: 100%;
  font: $font-26-31;
  color: rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(232, 233, 238, 0.3);
  cursor: pointer;
  margin-bottom: 26px;

  &:hover {
    color: #ffffff;
    transition: 0.5s;
    border-bottom: 1px solid rgba(232, 233, 238, 0.5);
  }
}

.category__current-item {
  font: $font-26-31;
  color: #ffffff;
  border-bottom: 1px solid rgba(232, 233, 238, 0.3);
  margin-bottom: 26px;
}

.category__input {
  width: 100%;
  height: 37px;
  border-bottom: 1px solid rgba(232, 233, 238, 0.3);
  font-weight: 300;
  font-size: 22px;
  line-height: 27px;
  color: #ffffff;
  margin-bottom: 10px;

  &::placeholder {
    font-weight: 300;
    font-size: 22px;
    line-height: 27px;
    color: rgba(255, 255, 255, 0.5);
  }
}

.category__select {
  font-size: 30px;
  line-height: 36px;
  font-family: "Inter", sans-serif;
  margin-bottom: 20px;

  &::after {
    position: relative;
    display: inline-block;
    content: "";
    background-image: url("../assets/category-select.svg");
    background-repeat: no-repeat;
    height: 9px;
    width: 17px;
    margin-left: 12px;
    top: -2px;
  }
}

.category__list {
  margin-left: 29px;
}

.category__list-item {
  display: flex;
  justify-content: space-between;
  font: $font-26-31;
  border-bottom: 1px solid rgba(232, 233, 238, 0.3);
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.category__control-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
