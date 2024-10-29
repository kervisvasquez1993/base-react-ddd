import { deleteQuestionAction } from "@/actions/question/delete.action";
import { GeneralErrorResponse } from "@/infrastructure/interfaces/backend/validatetionError";
import { QuestionSuccessResponse } from "@/infrastructure/interfaces/question/questionInterface";

export const deleteQuestionUseCase = async (token: string, questionId: number): Promise<QuestionSuccessResponse> => {
    try {
        const response = await deleteQuestionAction(token, questionId);
        return response as QuestionSuccessResponse;
    } catch (error) {
        let errorMessage = "Ocurrió un error al intentar eliminar la pregunta. Por favor, inténtalo de nuevo.";
        if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = (error as GeneralErrorResponse).message;
        }
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};
