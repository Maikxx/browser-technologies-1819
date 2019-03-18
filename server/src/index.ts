import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import compression from 'compression'
import { getIndexRoute, getErrorRoute } from './routes/getRoutes'
import { cache } from './services/memoryCache'

(async() => {
    const app = Express()
    app.use(Helmet())
    app.use(compression())
    app.use(Express.static(path.join(__dirname, '../public')))

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))

    app.get('/', cache(50), getIndexRoute)
    app.get('*', cache(5), getErrorRoute)

    app.listen(({ port: process.env.PORT || 3000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 3000}.`)
    })
})()
