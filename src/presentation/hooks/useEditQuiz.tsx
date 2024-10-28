// useEditQuiz.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStatus.store';
import { editQuizUseCase } from '@/core/use-case/quiz/edit.use-case';
import { toast } from 'sonner';
import { QuizPayload } from '@/infrastructure/interfaces/quiz/quizInterface';
import { useInitialDataQuiz } from './initialDataQuizTabline';


export const useEditQuiz = (quizId: number, onCloseDialog: () => void) => {
    const token = useAuthStore(state => state.token);
    const [errorsForm, setErrorsForm] = useState<string>("");
    const { register, handleSubmit, reset, formState: { errors } } = useForm<QuizPayload>();
    const { mutate } = useInitialDataQuiz();
    const onSubmit = async (data: QuizPayload) => {
        try {
            if (token) {
                await editQuizUseCase(token, quizId as number, {
                    title: data.title,
                    description: data.description,
                });
                toast.success("Quiz editado de forma correcta");
                reset();
                mutate();
                onCloseDialog();
            }
        } catch (error) {
            console.error("Error al editar el quiz:", error);
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
    };
};
