import cors from 'cors'
import type { Express } from 'express'
//
import nodesHandler from './handlers/nodesHandler'

export function server(app: Express) {
    app.use(cors())

    nodesHandler(app)

    app.listen(3000, function () {
        console.log('Server started...')
    })
}
