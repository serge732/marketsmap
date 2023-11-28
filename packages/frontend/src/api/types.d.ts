import type { AxiosRequestConfig } from 'axios'

type TRequestParams<I> = {
    input?: I
    config?: AxiosRequestConfig<I>
}

type TRequestParamsWithInput<I> = TRequestParams<I> & { input: I }

type TRequestResult<T> = {
    ok: boolean
    error: string | null
    data: T | null
}
