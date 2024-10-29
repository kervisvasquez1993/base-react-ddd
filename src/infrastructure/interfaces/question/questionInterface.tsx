import { ErrorResponse } from "../backend/validatetionError";
export interface QuestionPayload {
    question: string;
    correct_answer: boolean;
    image: File | null;
    quiz_id: number
}
export interface QuestionUpdatePayload {
    quiz_id: number;
    question: string;
    correct_answer: boolean;
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

export type QuestionResponse = QuestionSuccessResponse | ErrorResponse | QuestionUpdatePayload;
