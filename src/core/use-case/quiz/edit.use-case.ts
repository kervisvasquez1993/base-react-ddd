import { editQuizAction } from '@/actions/quiz/edit.action';
import { GeneralErrorResponse, ValidationErrorData } from '@/infrastructure/interfaces/backend/validatetionError';
import { QuizPayload, QuizSuccessResponse } from '@/infrastructure/interfaces/quiz/quizInterface';

export const editQuizUseCase = async (token: string, quizId: number, quizData: QuizPayload): Promise<QuizSuccessResponse> => {
    try {
        const response = await editQuizAction(token, quizId, quizData);
        return response as QuizSuccessResponse;
    } catch (errors) {
        let errorMessage = "Ocurrió un error al intentar editar el quiz. Por favor, inténtalo de nuevo.";

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
