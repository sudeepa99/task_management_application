import axiosInstance from "@/lib/axios";

export const taskService = {
  getMyTasks: (params) => axiosInstance.get("/api/tasks", { params }),

  getTaskById: (id) => axiosInstance.get(`/api/tasks/${id}`),

  createTask: (data) => axiosInstance.post("/api/tasks", data),

  updateTask: (id, data) => axiosInstance.put(`/api/tasks/${id}`, data),

  deleteTask: (id) => axiosInstance.delete(`/api/tasks/${id}`),

  getAllTasksAdmin: (params) =>
    axiosInstance.get("/api/tasks/admin/all", { params }),
};
