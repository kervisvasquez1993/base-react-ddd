import { ErrorResponse } from "../backend/validatetionError";
export interface QuestionPayload {
    question: string;
    correct_answer: boolean;
    image: File | null;
    quiz_id: number
}


export interface QuestionSuccessResponse {
    question: string;
    quiz_id: number;
    image: string | null;
    correct_answer: boolean;
    user_id: number;
    updated_at: string;
    created_at: string;
    id: number;
}

export type QuestionResponse = QuestionSuccessResponse | ErrorResponse;
