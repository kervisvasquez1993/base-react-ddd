
import { addQuizAction } from '@/actions/quiz/create.action';
import { GeneralErrorResponse, ValidationErrorData } from '@/infrastructure/interfaces/backend/validatetionError';
import { QuizPayload, QuizSuccessResponse } from '@/infrastructure/interfaces/quiz/quizInterface';


export const addQuizUseCase = async (token: string, quizData: QuizPayload): Promise<QuizSuccessResponse> => {
    try {
        const response = await addQuizAction(token, quizData);
        return response as QuizSuccessResponse;
    } catch (errors) {
        let errorMessage = "Ocurrió un error al intentar crear el quiz. Por favor, inténtalo de nuevo.";
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