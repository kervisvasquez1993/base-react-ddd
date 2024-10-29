import { useSubmitPlayerAnswer } from "../hooks/useSubmitPlayerAnswer";

export const PlayerAnswerForm: React.FC<{ questionId: string }> = ({ questionId }) => {
    const { handleSubmit, register, errorsForm, onSubmit } = useSubmitPlayerAnswer(Number(questionId));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Selecciona tu respuesta:</h2>
            <div>
                <label>
                    <input type="radio" value="true" {...register("given_answer", { required: true })} />
                    Verdadero
                </label>
                <label>
                    <input type="radio" value="false" {...register("given_answer", { required: true })} />
                    Falso
                </label>
            </div>
            {errorsForm && <div className="error">{errorsForm}</div>}
            <button type="submit">Enviar Respuesta</button>
        </form>
    );
};