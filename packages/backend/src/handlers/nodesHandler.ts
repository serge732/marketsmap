import { Express } from 'express'
//
import nodesService from '../services/nodesService'
import { errorResponseBody, okResponseBody } from './__helpers'

export default function nodesHandler(app: Express) {
    app.get('/nodeEngineIds', function (request, response) {
        try {
            const nodeEngineIds = nodesService.nodeEngineIds()
            response.send(okResponseBody(nodeEngineIds))
        } catch (error) {
            response.send(errorResponseBody((error as Error).message))
        }
    })
    app.get('/nodeMarketIds', function (request, response) {
        try {
            const { query } = request

            const engineId = query.engineId?.toString()

            if (!engineId) {
                throw new Error('Некорректные параметры запроса')
            }

            const nodeMarketIds = nodesService.nodeMarketIds({ engineId })
            response.send(okResponseBody(nodeMarketIds))
        } catch (error) {
            response.send(errorResponseBody((error as Error).message))
        }
    })
    app.get('/nodeSecIds', function (request, response) {
        try {
            const { query } = request

            const engineId = query.engineId?.toString()
            const marketId = query.marketId?.toString()

            if (!engineId || !marketId) {
                throw new Error('Некорректные параметры запроса')
            }

            const nodeSecIds = nodesService.nodeSecIds({ engineId, marketId })
            response.send(okResponseBody(nodeSecIds))
        } catch (error) {
            response.send(errorResponseBody((error as Error).message))
        }
    })
    app.get('/node', async function (request, response) {
        try {
            const { query } = request

            const engineId = query.engineId?.toString()
            const marketId = query.marketId?.toString()
            const secId = query.secId?.toString()
            const from = query.from?.toString()
            const till = query.till?.toString()

            if (!engineId || !marketId || !secId || !from || !till) {
                throw new Error('Некорректные параметры запроса')
            }

            const node = await nodesService.node({
                engineId,
                marketId,
                secId,
                from,
                till,
            })

            response.send(okResponseBody(node))
        } catch (error) {
            response.send(errorResponseBody((error as Error).message))
        }
    })
}
