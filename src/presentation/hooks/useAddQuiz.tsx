import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStatus.store';
import { useInitialDataQuiz } from './initialDataQuizTabline';
import { QuizPayload } from '@/infrastructure/interfaces/quiz/quizInterface';
import { addQuizUseCase } from '@/core/use-case/quiz/add.user-case';
import { toast } from 'sonner';
export const useAddQuiz = (onCloseDialog: () => void) => {
    const token = useAuthStore(state => state.token);
    const { mutate } = useInitialDataQuiz();
    const [errorsForm, setErrorsForm] = useState<string>("");
    const { register, handleSubmit, reset, formState: { errors } } = useForm<QuizPayload>();

    const onSubmit = async (data: QuizPayload) => {
        try {
            if (token) {
                await addQuizUseCase(token, {
                    title: data.title,
                    description: data.description,
                });
                mutate();
                toast.success("Registro Agregado de forma correcta");
                reset();
                onCloseDialog(); 
            }
        } catch (error) {
            console.error("Error al agregar el quiz:", error);
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
    };
};