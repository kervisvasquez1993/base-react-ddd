import { ApiBackend } from "@/config/api/ApiBacken";
import { GeneralErrorResponse, ValidationErrorResponse } from "@/infrastructure/interfaces/backend/validatetionError";
import { QuestionPayload, QuestionResponse, QuestionSuccessResponse } from "@/infrastructure/interfaces/question/questionInterface";

export const addQuestionAction = async (token: string, quizId: number, questionData: QuestionPayload): Promise<QuestionResponse> => {
    try {
        const response = await ApiBackend.post(`/api/quiz/${quizId}/questions`, questionData, {
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
        let errorMessage = "Ocurrió un error al intentar crear la pregunta. Por favor, inténtalo de nuevo.";

        if (error.response && error.response.data) {
            if (error.response.data.message && error.response.data.data) {
                const validationError = error.response.data as ValidationErrorResponse;
                errorMessage = `${validationError.message}\n` +
                    Object.entries(validationError.data)
                        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                        .join("\n");
                throw validationError;
            } else if (error.response.data.message) {
                const generalError = error.response.data as GeneralErrorResponse;
                throw generalError;
            }
        } else {
            console.error("Error de red o desconocido", error);
        }

        throw new Error(errorMessage);
    }
};