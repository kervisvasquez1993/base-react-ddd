import { ErrorResponse } from "../backend/validatetionError";

export interface QuizPayload {
    title: string;
    description: string;
}

export interface QuizSuccessResponse {
    id: number;
    title: string;
    description: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export type QuizResponse = QuizSuccessResponse | ErrorResponse;