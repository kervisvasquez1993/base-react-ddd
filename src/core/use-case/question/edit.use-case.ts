import { editQuestionAction } from "@/actions/question/edit.action";
import { GeneralErrorResponse, ValidationErrorData } from "@/infrastructure/interfaces/backend/validatetionError";
import { QuestionSuccessResponse, QuestionUpdatePayload } from "@/infrastructure/interfaces/question/questionInterface";

export const editQuestionUseCase = async (token: string, questionId: number, questionData: QuestionUpdatePayload): Promise<QuestionSuccessResponse> => {
    try {
        const response = await editQuestionAction(token, questionId, questionData);
        return response as QuestionSuccessResponse;
    } catch (errors) {
        let errorMessage = "Ocurrió un error al intentar editar la pregunta. Por favor, inténtalo de nuevo.";

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