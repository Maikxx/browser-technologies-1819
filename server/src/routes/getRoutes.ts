require('dotenv').config()
import Express from 'express'
import { getRoomById } from '../services/database'

export function getIndexRoute(request: Express.Request, response: Express.Response) {
    response.status(200).render('pages/index')
}

export async function getRoomRoute(request: Express.Request, response: Express.Response) {
    const { id } = request.params
    const room = await getRoomById(Number(id))

    if (!room) {
        return response.status(404).redirect('/?error=not-found')
    }

    const urlBase = process.env.NODE_ENV !== 'production'
        ? `http://localhost:3000`
        : `https://browser-technologies.herokuapp.com`
    const participationUrl = `${urlBase}/room/${room.id}/question`
    const scoreUrl = `${urlBase}/room/${room.id}/score`

    response.status(200).render('pages/room', {
        room,
        participationUrl,
        scoreUrl,
    })
}

export function getQuestionRoute(request: Express.Request, response: Express.Response) {
    response.status(200).render('pages/question', {})
}

export function getPendingRoute(request: Express.Request, response: Express.Response) {
    response.status(200).render('pages/pending', {})
}

export function getScoreRoute(request: Express.Request, response: Express.Response) {
    response.status(200).render('pages/score', {})
}

export function getErrorRoute(request: Express.Request, response: Express.Response) {
    response.status(404).redirect('/?error=not-found')
}
