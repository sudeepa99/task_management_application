import Cookies from "js-cookie";

import axiosInstance from "@/lib/axios";

export const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    const { token, id, email: userEmail, role } = response.data;
    Cookies.set("token", token, { expires: 1 });
    Cookies.set("user", JSON.stringify({ id, email: userEmail, role }), {
      expires: 1,
    });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await axiosInstance.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  logout: () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/login";
  },

  getCurrentUser: () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!Cookies.get("token"),
};
