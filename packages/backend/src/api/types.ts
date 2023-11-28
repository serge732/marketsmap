import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export type TRequestParams<I> = {
    input?: I;
    config?: AxiosRequestConfig<I>
};

export type TRequestParamsWithInput<I> =
    TRequestParams<I> & { input: I };

export type TRequest<P extends TRequestParams<{}>, R> =
    (params: P) => Promise<AxiosResponse<R, P['input']>>;
