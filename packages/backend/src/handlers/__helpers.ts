export function okResponseBody(data: unknown) {
    return {
        ok: true,
        error: null,
        data
    }
}

export function errorResponseBody(message: string) {
    return {
        ok: false,
        error: message,
        data: null
    }
}
