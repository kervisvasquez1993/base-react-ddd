import { ApiBackend } from "@/config/api/ApiBacken";
import { GeneralErrorResponse, ValidationErrorResponse } from "@/infrastructure/interfaces/backend/validatetionError";
import { PlayerAnswerPayload, PlayerAnswerResponse } from "@/infrastructure/interfaces/player/playerInterface";

export const submitPlayerAnswerAction = async (
    token: string,
    questionId: number,
    answerData: PlayerAnswerPayload
): Promise<PlayerAnswerResponse> => {
    try {
        const response = await ApiBackend.post(`/api/questions/${questionId}/player-answer`, answerData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            return response.data as PlayerAnswerResponse;
        } else {
            throw new Error("Unexpected response status");
        }
    } catch (error: any) {
        let errorMessage = "Ocurrió un error al intentar enviar la respuesta. Por favor, inténtalo de nuevo.";

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