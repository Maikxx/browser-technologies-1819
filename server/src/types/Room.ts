export interface QuestionOption {
    [key: string]: string
}

export interface Room {
    id: number
    question: string
    databaseOptions: QuestionOption[]
}

export interface CreateNewRoomProps {
    question: string
    options: [string, any][]
}
