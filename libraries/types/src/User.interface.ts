export interface Profile{
    email: string,
    cryptos: string[],
    press_keywords: string[],
    currency: string
}

export interface ProfileResponse{
    email: string,
    cryptos: string[],
    press_keywords: string[],
    currency: string
}

export interface UpdateProfileRequest{
    cryptos?: string[],
    press_keywords?: string[],
    currency?: string
}
