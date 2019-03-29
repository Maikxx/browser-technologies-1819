require('dotenv').config()
import util from 'util'
import path from 'path'
import fs from 'fs'
import { Room, CreateNewRoomProps, QuestionOption } from '../types/Room'

export const readFile = util.promisify(fs.readFile)
export const writeFile = util.promisify(fs.writeFile)
export const databasePath = path.join(__dirname, '../data/database.json')

export async function getDatabase () {
    try {
        const databaseBuffer = await readFile(databasePath)
        const database: Room[] = JSON.parse(databaseBuffer.toString())
        return database
    } catch (error) {
        throw new Error(error)
    }
}

export async function clearDatabase() {
    try {
        const clearedDatabase: Room[] = []
        await writeFile(databasePath, JSON.stringify(clearedDatabase))
    } catch (error) {
        throw new Error(error)
    }
}

export async function createNewRoom(props: CreateNewRoomProps) {
    const { options: validOptions, question } = props

    try {
        const database = await getDatabase()
        const lastItem = database[database.length - 1]

        const questionId = lastItem
            ? Number(lastItem.id) + 1
            : 0

        const options = validOptions.map(([ , value ], index) => ({
            answerId: index,
            title: value,
            currentCount: 0,
            incrementPostUrl: process.env.NODE_ENV !== 'production'
                ? `http://localhost:3000/increment-count/${questionId}/${index}`
                : `https://browser-technologies.herokuapp.com/increment-count/${questionId}/${index}`,
        }))

        const room = {
            id: questionId,
            question,
            options,
        }

        const updatedDatabase = [ ...database, room ]

        await writeFile(databasePath, JSON.stringify(updatedDatabase))

        return {
            id: questionId,
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function getRoomById(id: number) {
    try {
        const database = await getDatabase()
        const currentRoom = database.find(room => room.id === id)

        if (!currentRoom) {
            return null
        }

        return currentRoom
    } catch (error) {
        throw new Error(error)
    }
}

export async function incrementQuestionOptionCount(roomId: number, answerId: number) {
    try {
        const database = await getDatabase()
        const room = await getRoomById(Number(roomId))
        const questionOption = room && room.options.find((option: QuestionOption) => {
            return option.answerId === Number(answerId)
        })

        if (questionOption !== undefined && questionOption !== null) {
            questionOption.currentCount++

            const questionOptionIndex = room && room.options.findIndex(option => option.answerId === Number(answerId))
            const entryToUpdate = database.findIndex(room => room.id === Number(roomId))

            if (database[entryToUpdate] && questionOptionIndex !== null && questionOptionIndex > -1) {
                database[entryToUpdate].options[questionOptionIndex] = questionOption
            }
        }

        await writeFile(databasePath, JSON.stringify(database))
    } catch (error) {
        throw new Error(error)
    }
}
