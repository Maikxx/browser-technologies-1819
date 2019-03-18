import Express from 'express'

export function getIndexRoute(request: Express.Request, response: Express.Response) {
    response.status(200).render('pages/index', {})
}

export function getRoomRoute(request: Express.Request, response: Express.Response) {
    response.status(200).render('pages/room', {})
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
