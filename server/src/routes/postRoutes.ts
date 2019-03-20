import Express from 'express'
import { createNewRoom, incrementQuestionOptionCount } from '../services/database'

export async function postCreateRoomRoute(request: Express.Request, response: Express.Response) {
    const { question, ...options } = request.body
    const validOptions = Object.entries(options).filter(([ , value ]) => !!value)

    if (!question || !validOptions || validOptions.length === 0) {
        response.status(409).redirect('/?error=invalid-submission')
    }

    try {
        const { id } = await createNewRoom({
            question,
            options: validOptions,
        })

        response.status(200).redirect(`/room/${id}`)
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

export async function postIncrementRoute(request: Express.Request, response: Express.Response) {
    const { roomId, answerId } = request.params

    try {
        await incrementQuestionOptionCount(roomId, answerId)

        response.status(200).redirect(`/room/${roomId}/pending`)
    } catch (error) {
        throw new Error(error)
    }
}
