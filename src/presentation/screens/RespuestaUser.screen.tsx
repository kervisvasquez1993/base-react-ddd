
import { CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useDataForUser } from "../hooks/loadDataFourUser"
import { useParams } from "react-router-dom"
import { Spinner } from "../components/section/SpinerComponents"

type UserResponse = {
    id: number
    user_id: number
    is_correct: number
    question_name: string
    question_image: string | null
}

export function UserResponsesScreen() {
    const { userId } = useParams();
    const { data, isLoading } = useDataForUser({ id: userId || "" });
    console.log(data)
    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader className="bg-primary text-primary-foreground p-6">
                <CardTitle className="text-3xl font-bold text-center">Respuestas del Usuario</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid gap-4">
                    {
                        isLoading ? <Spinner /> : (

                            data.data.map((response: UserResponse) => (
                                <Card
                                    key={response.id}
                                    className={`p-4 ${response.is_correct
                                        ? "bg-green-100 border-green-500"
                                        : "bg-red-100 border-red-500"
                                        } border-2`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold mb-2">{response.question_name}</h3>
                                            {response.question_image && (
                                                <img
                                                    src={response.question_image}
                                                    alt="Imagen de la pregunta"
                                                    className="max-w-full h-auto rounded-md mb-2"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-shrink-0 ml-4">
                                            {response.is_correct ? (
                                                <CheckCircle className="w-8 h-8 text-green-600" />
                                            ) : (
                                                <XCircle className="w-8 h-8 text-red-600" />
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))

                        )
                    }

                </div>
            </CardContent>
        </Card>
    )
}