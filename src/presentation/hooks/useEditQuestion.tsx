import { editQuestionUseCase } from "@/core/use-case/question/edit.use-case";
import { QuestionUpdatePayload } from "@/infrastructure/interfaces/question/questionInterface";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStatus.store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useInitialDataQuestionTabline } from "./initialDataQuestionTabline";

export const useEditQuestion = (questionId: number, onCloseDialog: () => void) => {
    const token = useAuthStore(state => state.token);
    const [errorsForm, setErrorsForm] = useState<string>("");
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<QuestionUpdatePayload>();
    const { mutate } = useInitialDataQuestionTabline()
    const onSubmit = async (data: QuestionUpdatePayload) => {
        try {
            if (token) {
                await editQuestionUseCase(token, questionId, {
                    quiz_id: data.quiz_id,
                    question: data.question,
                    correct_answer: data.correct_answer,
                });
                toast.success("Pregunta editada de forma correcta");
                reset();
                mutate();
                onCloseDialog();
            }
        } catch (error) {
            console.error("Error al editar la pregunta:", error);
            if (error instanceof Error) {
                setErrorsForm(error.message);
            } else {
                setErrorsForm("Ocurrió un error inesperado. Inténtalo de nuevo.");
            }
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        errorsForm,
        onSubmit, 
        setValue
    };
};