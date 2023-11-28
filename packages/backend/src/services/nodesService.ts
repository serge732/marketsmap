import api from '../api'
import type { CandlesRequestInput } from '../api/moex'
import { engines } from './__engines'

export function nodeEngineIds() {
    return Object.values(engines).map((engine) => engine.id)
}

interface NodeMarketIdsParams {
    engineId: string
}

export function nodeMarketIds(params: NodeMarketIdsParams) {
    return Object.values(engines[params.engineId].markets).map(
        (market) => market.id,
    )
}

interface NodeSecIdsParams {
    engineId: string
    marketId: string
}

export function nodeSecIds(params: NodeSecIdsParams) {
    return Object.values(
        engines[params.engineId].markets[params.marketId].securities,
    ).map((security) => security.id)
}

interface NodeParams extends Omit<CandlesRequestInput, 'interval'> {}

export async function node(params: NodeParams) {
    const interval = '24'

    let candlesRequestResult = await api.moex.candles({
        input: { ...params, interval },
    })

    const { candles } = candlesRequestResult.data

    function columnIndex(columnName: string) {
        return candles.columns.findIndex((column) => column === columnName)
    }

    const firstCandle = candles.data[0]
    const firstCandleOpen = Number(firstCandle[columnIndex('open')])
    const firstCandleBegin = String(firstCandle[columnIndex('begin')])

    const lastCandle = candles.data[candles.data.length - 1]
    const lastCandleClose = Number(lastCandle[columnIndex('close')])
    const lastCandleEnd = String(lastCandle[columnIndex('end')])

    const valueChangeSign = lastCandleClose - firstCandleOpen > 0 ? +1 : -1

    let valueChange = 0

    if (valueChangeSign > 0) {
        valueChange = lastCandleClose / firstCandleOpen - 1
    } else {
        valueChange = 1 - lastCandleClose / firstCandleOpen
    }

    return {
        secId: params.secId,
        value: lastCandleClose,
        valueChangePercents: (valueChange * 100).toFixed(2),
        valueChangeSign,
        begin: firstCandleBegin,
        end: lastCandleEnd,
    }
}

export default {
    nodeEngineIds,
    nodeMarketIds,
    nodeSecIds,
    node,
}
