import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import socketIO from 'socket.io'
import http from 'http'
import compression from 'compression'
import bodyParser from 'body-parser'
import {
    getIndexRoute,
    getErrorRoute,
    getRoomRoute,
    getJoinRoute,
    getPendingRoute,
    getScoreRoute,
} from './routes/getRoutes'
import { postCreateRoomRoute, postIncrementRoute, postIncrementOptionFieldsRoute } from './routes/postRoutes'
import { ScoreAddedProps } from './types/Room'

(async() => {
    const app = Express()
    const server = new http.Server(app)
    const urlencodedParser = bodyParser.urlencoded({ extended: false })
    const socketio = socketIO(server)

    app.use(Helmet())
    app.use(compression())
    app.use(Express.static(path.join(__dirname, '../public')))

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))

    app.get('/', getIndexRoute)
    app.get('/room/:id', getRoomRoute)
    app.get('/room/:id/join', getJoinRoute)
    app.get('/room/:id/score', getScoreRoute)
    app.get('/room/:id/pending/:selectedId', getPendingRoute)
    app.get('*', getErrorRoute)

    app.post('/create-room', urlencodedParser, postCreateRoomRoute)
    app.post('/increment-count/:roomId/:answerId', postIncrementRoute)
    app.post('/increment-option-fields/:nextIoc', urlencodedParser, postIncrementOptionFieldsRoute)

    socketio.on('connection', (socket: SocketIO.Socket) => {
        socket.on('score added', (data: ScoreAddedProps) => {
            socketio.emit('score added', data)
        })
    })

    server.listen(({ port: process.env.PORT || 3000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 3000}.`)
    })
})()
