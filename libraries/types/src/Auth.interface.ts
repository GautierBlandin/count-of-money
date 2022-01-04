export interface AuthResponse{
    email: string,
    access_token: string,
}

export interface TokenValidationResponse{
    valid: boolean,
    token: string,
    email?: string
}
