import { instance } from '../instance'
import type { TRequestParamsWithInput, TRequestResult } from '../types'

interface GetNodeMarketIdsParams {
    engineId: string
}

export function getNodeMarketIds(
    params: TRequestParamsWithInput<GetNodeMarketIdsParams>,
) {
    const { engineId } = params.input
    return instance.get<TRequestResult<string[]>>(
        `nodeMarketIds?engineId=${engineId}`,
        {
            ...params.config,
        },
    )
}
