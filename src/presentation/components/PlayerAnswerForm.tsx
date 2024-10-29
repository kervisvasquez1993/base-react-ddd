import { useSubmitPlayerAnswer } from "../hooks/useSubmitPlayerAnswer";
import { useAuthStore } from "../store/useAuthStatus.store";

export const PlayerAnswerForm: React.FC<{ questionId: string }> = ({ questionId }) => {
    const { handleSubmit, register, errorsForm, onSubmit } = useSubmitPlayerAnswer(Number(questionId));
    const token = useAuthStore(state => state.token);

    return (
        <div className="p-6 bg-gray-100 rounded-[15px] shadow-lg max-w-md mx-auto">
            {token ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Selecciona tu respuesta:</h2>
                    <div className="flex flex-col gap-3 mb-4">
                        <label className="flex items-center gap-2 text-gray-700">
                            <input
                                type="radio"
                                value="true"
                                {...register("given_answer", { required: true })}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            Verdadero
                        </label>
                        <label className="flex items-center gap-2 text-gray-700">
                            <input
                                type="radio"
                                value="false"
                                {...register("given_answer", { required: true })}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            Falso
                        </label>
                    </div>
                    {errorsForm && <div className="text-red-500 text-sm mb-4">{errorsForm}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-[10px] shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        Enviar Respuesta
                    </button>
                </form>
            ) : (
                <div className="text-center text-gray-700">
                    <p className="text-lg font-semibold mb-4">Para participar necesita estar logueado.</p>
                    <p className="text-sm">
                        Si no tiene cuenta, por favor <a href="/register" className="text-blue-600 underline">regístrese</a>.
                    </p>
                </div>
            )}
        </div>
    );
};