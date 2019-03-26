require('dotenv').config()
import Express from 'express'
import { getRoomById } from '../services/database'
import { state } from '../services/state'

interface RouteParams {
    id?: string
    selectedId?: string
}

export function getIndexRoute(request: Express.Request, response: Express.Response) {
    const { ioc } = request.query as { ioc: string }
    const nextIoc = state.currentIoc + (Number(ioc) || 0)
    state.currentIoc = nextIoc

    response.status(200).render('pages/index', {
        ioc: nextIoc,
    })
}

export async function getRoomRoute(request: Express.Request, response: Express.Response) {
    const { id } = request.params as RouteParams
    const room = await getRoomById(Number(id))

    if (!room) {
        return response.status(404).redirect('/?error=not-found')
    }

    const urlBase = process.env.NODE_ENV !== 'production'
        ? `http://localhost:3000`
        : `https://browser-technologies.herokuapp.com`
    const participationUrl = `${urlBase}/room/${room.id}/join`
    const scoreUrl = `${urlBase}/room/${room.id}/score`

    response.status(200).render('pages/room', {
        room,
        participationUrl,
        scoreUrl,
    })
}

export async function getJoinRoute(request: Express.Request, response: Express.Response) {
    const { id } = request.params as RouteParams
    const room = await getRoomById(Number(id))

    if (!room) {
        return response.status(404).redirect('/?error=not-found')
    }

    response.status(200).render('pages/join', {
        room,
    })
}

export async function getPendingRoute(request: Express.Request, response: Express.Response) {
    const { id, selectedId } = request.params as RouteParams
    const room = await getRoomById(Number(id))
    const selectedOption = room && room.options.find(option => option.answerId === Number(selectedId))

    if (!room || !selectedOption) {
        return response.status(404).redirect('/?error=not-found')
    }

    response.status(200).render('pages/pending', {
        room,
        selectedOption,
    })
}

export async function getScoreRoute(request: Express.Request, response: Express.Response) {
    const { id } = request.params as RouteParams
    const room = await getRoomById(Number(id))

    if (!room) {
        return response.status(404).redirect('/?error=not-found')
    }

    response.status(200).render('pages/score', {
        room,
    })
}

export function getErrorRoute(request: Express.Request, response: Express.Response) {
    response.status(404).redirect('/?error=not-found')
}
