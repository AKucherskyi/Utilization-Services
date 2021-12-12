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
    questions?: string[]
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
}