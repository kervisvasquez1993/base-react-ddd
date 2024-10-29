import { useState } from "react";
import { useAuthStore } from "../store/useAuthStatus.store";
import { useForm } from "react-hook-form";
import { QuestionPayload } from "@/infrastructure/interfaces/question/questionInterface";
import { addQuestionUseCase } from "@/core/use-case/question/add.use-case";
import { toast } from "sonner";
import { useInitialDataQuestionTabline } from "./initialDataQuestionTabline";
export const useAddQuestion = (onCloseDialog: () => void) => {
    const token = useAuthStore(state => state.token);
    const [errorsForm, setErrorsForm] = useState<string>("");
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<QuestionPayload>();
    const { mutate } = useInitialDataQuestionTabline()
    const onSubmit = async (data: QuestionPayload) => {
        try {
            if (token) {
                console.log(data, "data to backend")
                await addQuestionUseCase(token, data.quiz_id, {
                    question: data.question,
                    correct_answer: data.correct_answer,
                    image: data.image,
                    quiz_id: data.quiz_id

                });
                toast.success("Pregunta agregada de forma correcta");
                reset();
                mutate();
                onCloseDialog();
            }
        } catch (error) {
            console.error("Error al agregar la pregunta:", error);
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
        setErrorsForm,
        onSubmit,
        setValue
    };
};