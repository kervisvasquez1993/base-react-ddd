import { deleteQuizAction } from "@/actions/quiz/deleted.action";
import { GeneralErrorResponse } from "@/infrastructure/interfaces/backend/validatetionError";
import {  QuizSuccessResponse } from "@/infrastructure/interfaces/quiz/quizInterface";
export const deleteQuizUseCase = async (token: string, quizId: number): Promise<QuizSuccessResponse> => {
    try {
        const response = await deleteQuizAction(token, quizId);
        return response as QuizSuccessResponse;
    } catch (error) {
        let errorMessage = "Ocurrió un error al intentar eliminar el quiz. Por favor, inténtalo de nuevo.";

        if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = (error as GeneralErrorResponse).message;
        }

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};