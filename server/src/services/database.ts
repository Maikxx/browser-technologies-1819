import util from 'util'
import path from 'path'
import fs from 'fs'
import { Room, CreateNewRoomProps } from '../types/Room'

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

        const databaseOptions = validOptions.map(([ , value ], index) => ({
            [`option-${index}`]: value,
        }))

        const room = {
            id: questionId,
            question,
            databaseOptions,
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
