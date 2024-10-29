import { submitPlayerAnswerAction } from "@/actions/player/answer.action";
import { GeneralErrorResponse, ValidationErrorData } from "@/infrastructure/interfaces/backend/validatetionError";
import { PlayerAnswerPayload, PlayerAnswerResponse } from "@/infrastructure/interfaces/player/playerInterface";

export const submitPlayerAnswerUseCase = async (
    token: string,
    questionId: number,
    answerData: PlayerAnswerPayload
): Promise<PlayerAnswerResponse> => {
    try {
        const response = await submitPlayerAnswerAction(token, questionId, answerData);
        return response as PlayerAnswerResponse;
    } catch (errors) {
        let errorMessage = "Ocurrió un error al intentar enviar la respuesta del jugador. Por favor, inténtalo de nuevo.";
        if (errors && typeof errors === 'object') {
            if ('data' in errors && typeof errors.data === 'object') {
                errorMessage = Object.keys(errors.data as ValidationErrorData)
                    .map(key => `${key}: ${(errors.data as ValidationErrorData)[key].join(', ')}`)
                    .join('\n');
            } else if ('message' in errors && typeof errors.message === 'string') {
                errorMessage = (errors as GeneralErrorResponse).message;
            }
        }
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};