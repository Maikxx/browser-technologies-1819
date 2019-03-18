import Express from 'express'

export function getIndexRoute(request: Express.Request, response: Express.Response) {
    response.status(200).render('pages/index', {})
}

export function getRoomRoute(request: Express.Request, response: Express.Response) {
    response.status(200).render('pages/room', {})
}

export function getErrorRoute(request: Express.Request, response: Express.Response) {
    response.status(404).redirect('/?error=not-found')
}
