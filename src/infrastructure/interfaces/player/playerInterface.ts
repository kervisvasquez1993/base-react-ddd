export interface PlayerAnswerPayload {
    given_answer: boolean;
}

export interface PlayerAnswerResponse {
    user_id: number;
    question_id: number;
    given_answer: boolean;
    is_correct: boolean;
    updated_at: string;
    created_at: string;
    id: number;
}