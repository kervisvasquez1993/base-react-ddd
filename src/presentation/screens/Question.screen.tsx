import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { useInitialDataQuestionOne } from "../hooks/loadDataQuestionOne";
import { loadDataAnswerByQuestion } from "../hooks/loadAnswerByQuestions";
import { Spinner } from "../components/section/SpinerComponents";
import { PlayerAnswerForm } from "../components/PlayerAnswerForm";



export function QuestionScreen() {
    const { questionId } = useParams();
    const { data: questionData, isLoading: questionLoading, isError } = useInitialDataQuestionOne({ id: questionId || "" });
    const { data, isLoading } = loadDataAnswerByQuestion({ id: questionId || "" });




    

    return (
        <div className="container mx-auto p-4 space-y-6">

            {
                questionLoading ? <Spinner /> : (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{questionData.question}</h1>
                        <img
                            src={questionData.image ? `${import.meta.env.VITE_API_BACKEND}${questionData.image}` : "/no-image.jpg"}
                            alt={questionData.question || "No image available"}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Badge variant="secondary">{questionData.quiz.title}</Badge>
                        </div>
                        <div>
                            <PlayerAnswerForm questionId={questionId  || "" }/>
                        </div>

                    </div>
                </div>)
            }


            <div>
                <h2 className="text-xl font-semibold mb-4">Usuarios que respondieron:</h2>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Puntos</TableHead>
                                <TableHead>Respuesta</TableHead>
                            </TableRow>
                        </TableHeader>

                        {
                            isLoading ? <Spinner /> : (<TableBody>
                                {data.data.map((usuario: any) => (
                                    <TableRow key={usuario.id}>
                                        <TableCell>{usuario.email}</TableCell>
                                        <TableCell>{usuario.point}</TableCell>
                                        <TableCell>
                                            <span className={usuario.is_correct ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                                {usuario.is_correct ? "Correcta" : "Incorrecta"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>)
                        }

                    </Table>
                </div>
            </div>
        </div>
    )
}