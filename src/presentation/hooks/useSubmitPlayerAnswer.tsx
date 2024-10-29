import { useState } from "react";
import { useAuthStore } from "../store/useAuthStatus.store";
import { useForm } from "react-hook-form";
import { PlayerAnswerPayload } from "@/infrastructure/interfaces/player/playerInterface";
import { submitPlayerAnswerUseCase } from "@/core/use-case/player/create.use-case";
import { toast } from "sonner";

export const useSubmitPlayerAnswer = (questionId: number) => {
    const token = useAuthStore(state => state.token); // Asegúrate de tener este hook para obtener el token
    const [errorsForm, setErrorsForm] = useState<string>("");
    const { register, handleSubmit, reset } = useForm<PlayerAnswerPayload>();

    const onSubmit = async (data: PlayerAnswerPayload) => {
        try {
            if (token) {
                await submitPlayerAnswerUseCase(token, questionId, { given_answer: data.given_answer === true });
                toast.success("Respuesta enviada correctamente");
                reset();
            }
        } catch (error) {
            console.error("Error al enviar la respuesta:", error);
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
        errorsForm,
        onSubmit
    };
};