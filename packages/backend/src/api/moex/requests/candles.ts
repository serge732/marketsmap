import { moexInstance } from '../instance'
import type { TRequestParamsWithInput } from '../../types'

export interface CandlesRequestInput {
    engineId: string
    marketId: string
    secId: string
    from: string
    till: string
    interval: string
}

export interface CandlesRequestResultData {
    candles: {
        columns: string[]
        data: (string | number)[][]
    }
}

export function candles(params: TRequestParamsWithInput<CandlesRequestInput>) {
    const { input } = params
    const { engineId, marketId, secId, from, till, interval } = input

    const queryParams = [
        (from || '') && `from=${from}`,
        (interval || '') && `interval=${interval}`,
        (till || '') && `till=${till}`,
    ]

    return moexInstance.get<CandlesRequestResultData>(
        `/engines/${engineId}/markets/${marketId}/securities/${secId}/candles.json?${queryParams.join(
            '&',
        )}`,
        {
            ...params.config,
        },
    )
}
