import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import compression from 'compression'
import { getIndexRoute, getErrorRoute } from './routes/getRoutes'

(async() => {
    const app = Express()
    app.use(Helmet())
    app.use(compression())
    app.use(Express.static(path.join(__dirname, '../public')))

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))

    app.get('/', getIndexRoute)
    app.get('/', getIndexRoute)
    app.get('*', getErrorRoute)

    app.listen(({ port: process.env.PORT || 3000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 3000}.`)
    })
})()
