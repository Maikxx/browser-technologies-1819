export interface QuestionOption {
    answerId: number
    currentCount: number
    [key: string]: string | number
}

export interface Room {
    id: number
    question: string
    options: QuestionOption[]
}

export interface CreateNewRoomProps {
    question: string
    options: [string, any][]
}

export interface ScoreAddedProps {
    roomId: string
    answerId: string
}
