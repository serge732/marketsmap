import { instance } from '../instance'
import type { TRequestParams, TRequestResult } from '../types'

export function getNodeEngineIds(params: TRequestParams<{}>) {
    return instance.get<TRequestResult<string[]>>('nodeEngineIds', {
        ...params.config,
    })
}
