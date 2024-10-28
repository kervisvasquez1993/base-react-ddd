export interface ValidationErrorData {
    [key: string]: string[];
}

export interface ValidationErrorResponse {
    message: string;
    data: ValidationErrorData;
}

export interface GeneralErrorResponse {
    message: string;
}

export type ErrorResponse = ValidationErrorResponse | GeneralErrorResponse;