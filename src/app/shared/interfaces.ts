export interface GeoJson {
    type?: string
    features?: any[]
}

export interface Service {
    service_id: string
    type: string
    rating_quantity: number
    address: string
    coordinates: number[]
    description: string
    summary: string
    created_at: string
    updated_at: string
    questions?: any[]
    comments?: Comment[]
    phone_number: string
}

export interface Comment {
    service_id: string
    content: string
}
export interface Comment {
    comment_id: string
    service_id: string
    content: string
    created_at: string
    updated_at: string
    userName?: string
}

export interface Feature {
    place_name: string
    center: number[]
}

export interface Question {
    description: string
    service_id: string
    question_id: string
    created_at: string
    updated_at: string
    userName?: string

}

export interface Rules {
    title: string
    text: string
    button: string
    id: string
}

export interface RegisterResponse {
    user_id: string
    email: string
    username: string
    password: string
    created_at: string
    updated_at: string
}

export interface User {
    user_id: string
    email: string
    firstname: string
    lastname: string
    password: string
    created_at: string
    updated_at: string
    services: any[]
    questions: any[]
    comments: any[]
}

export interface LoginResponse {
    user_id: string
    email: string
    firstname: string
    lastname: string
    password: string
    created_at: string
    updated_at: string
    services: any[]
    questions: any[]
    comments: any[]
    favorites: any[]
    token: string
    isActivated: boolean
}

export interface GoogleAuthResponse {
    clientId: string
    credential: string
    select_by: string
}