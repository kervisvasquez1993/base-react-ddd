import { ApiBackend } from "@/config/api/ApiBacken";
import { LoginResponse } from "@/infrastructure/interfaces/auth/login-response.interface";
import axios from "axios";

const returnToken = (response: LoginResponse) => response.access_token;
export const authLogin = async (email: string, password: string) => {
  try {
    const { data } = await ApiBackend.post("/api/login", {
      email,
      password,
    });
    return returnToken(data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "Error desconocido del servidor";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};