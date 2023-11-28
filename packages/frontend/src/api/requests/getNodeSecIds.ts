import { instance } from '../instance'
import type { TRequestParamsWithInput, TRequestResult } from '../types'

interface GetNodeSecIdsParams {
    engineId: string
    marketId: string
}

export function getNodeSecIds(
    params: TRequestParamsWithInput<GetNodeSecIdsParams>,
) {
    const { engineId, marketId } = params.input
    return instance.get<TRequestResult<string[]>>(
        `nodeSecIds?engineId=${engineId}&marketId=${marketId}`,
        {
            ...params.config,
        },
    )
}
