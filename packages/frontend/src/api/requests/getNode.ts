import { instance } from '../instance'
import type { TRequestParamsWithInput, TRequestResult } from '../types'
import type { Node } from '../schema'

interface GetNodeParams {
    engineId: string
    marketId: string
    secId: string
    from: string
    till: string
}

export function getNode(params: TRequestParamsWithInput<GetNodeParams>) {
    const { engineId, marketId, secId, from, till } = params.input

    const queryParams = [
        (engineId || '') && `engineId=${engineId}`,
        (marketId || '') && `marketId=${marketId}`,
        (secId || '') && `secId=${secId}`,
        (from || '') && `from=${from}`,
        (till || '') && `till=${till}`,
    ]

    return instance.get<TRequestResult<Node>>(`node?${queryParams.join('&')}`)
}
