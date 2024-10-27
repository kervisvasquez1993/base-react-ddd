export interface LoginResponse {
    access_token: string;
    data: {
      id: number;
      username: string;
      email: string;
      role: string;
      points: string;
      created_at: string;
      updated_at: string | null;
    };
  }
  