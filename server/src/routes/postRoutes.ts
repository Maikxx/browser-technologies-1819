import Express from 'express'

export function postCreateRoomRoute(request: Express.Request, response: Express.Response) {
    // Save the question and options to a database
    // Get the ID from the database
    response.status(200).redirect('/room/#1#')
}
