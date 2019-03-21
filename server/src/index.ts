import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
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
import { postCreateRoomRoute, postIncrementRoute } from './routes/postRoutes'

(async() => {
    const app = Express()
    app.use(Helmet())
    app.use(compression())
    app.use(Express.static(path.join(__dirname, '../public')))
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

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

    app.listen(({ port: process.env.PORT || 3000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 3000}.`)
    })
})()
