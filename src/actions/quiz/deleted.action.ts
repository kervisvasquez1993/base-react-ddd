
import { ApiBackend } from "@/config/api/ApiBacken";
import { GeneralErrorResponse } from "@/infrastructure/interfaces/backend/validatetionError";
import { QuizResponse, QuizSuccessResponse } from "@/infrastructure/interfaces/quiz/quizInterface";
export const deleteQuizAction = async (token: string, quizId: number): Promise<QuizResponse> => {
    try {
        const response = await ApiBackend.delete(`/api/quiz/${quizId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201 || response.status === 204) { 
            return response.data as QuizSuccessResponse;
        } else {
            throw new Error("Unexpected response status");
        }
    } catch (error: any) {
        let errorMessage = "Ocurrió un error al intentar eliminar el quiz. Por favor, inténtalo de nuevo.";

        if (error.response && error.response.data) {
            if (error.response.data.message) {
                const generalError = error.response.data as GeneralErrorResponse;
                throw generalError; // Lanza el error general directamente con el mensaje del backend
            }
        } else {
            console.error("Error de red o desconocido", error);
        }

        throw new Error(errorMessage);
    }
};

