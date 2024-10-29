import { addQuestionAction } from "@/actions/question/create.action";
import { GeneralErrorResponse, ValidationErrorData } from "@/infrastructure/interfaces/backend/validatetionError";
import { QuestionPayload, QuestionSuccessResponse } from "@/infrastructure/interfaces/question/questionInterface";

export const addQuestionUseCase = async (token: string, quizId: number, questionData: QuestionPayload): Promise<QuestionSuccessResponse> => {
    try {
        const response = await addQuestionAction(token, quizId, questionData);
        return response as QuestionSuccessResponse;
    } catch (errors) {
        let errorMessage = "Ocurrió un error al intentar crear un question. Por favor, inténtalo de nuevo.";
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