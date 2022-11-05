export interface User {
    name: string
    username: string
    role?: string
}

export interface LoginResponse {
    accessToken: string
    username: string
    name: string
}

export interface Task {
    id: string
    title: string
    prio?: number
    completed: boolean
    duration?: number
    description: string
}