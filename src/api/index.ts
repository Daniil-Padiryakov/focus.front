import instance from "./instance";
import authService from "./services/authService";
import pomodoroService from "./services/pomodoroService";
import categoryService from "./services/categoryService";

export default {
  auth: authService(instance),
  pomodoro: pomodoroService(instance),
  category: categoryService(instance),
};
