import { ApiBackend } from "@/config/api/ApiBacken";
import { GeneralErrorResponse } from "@/infrastructure/interfaces/backend/validatetionError";
import { QuestionSuccessResponse } from "@/infrastructure/interfaces/question/questionInterface";

export const deleteQuestionAction = async (token: string, questionId: number): Promise<QuestionSuccessResponse> => {
    try {
        const response = await ApiBackend.delete(`/api/questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 201) {
            return response.data as QuestionSuccessResponse;
        } else {
            throw new Error("Unexpected response status");
        }
    } catch (error: any) {
        let errorMessage = "Ocurrió un error al intentar eliminar la pregunta. Por favor, inténtalo de nuevo.";

        if (error.response && error.response.data) {
            if (error.response.data.message) {
                const generalError = error.response.data as GeneralErrorResponse;
                throw generalError;
            }
        } else {
            console.error("Error de red o desconocido", error);
        }
        throw new Error(errorMessage);
    }
};