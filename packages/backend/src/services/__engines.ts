export const engines: {
    [key: string]: {
        id: string
        markets: {
            [key: string]: {
                id: string
                securities: {
                    [key: string]: {
                        id: string
                    }
                }
            }
        }
    }
} = {
    stock: {
        id: 'stock',
        markets: {
            shares: {
                id: 'shares',
                securities: {
                    SBER: { id: 'SBER' },
                    MOEX: { id: 'MOEX' },
                    LKOH: { id: 'LKOH' },
                },
            },
        },
    },
    currency: {
        id: 'currency',
        markets: {
            selt: {
                id: 'selt',
                securities: {
                    USD000UTSTOM: { id: 'USD000UTSTOM' },
                    GLDRUB_TOM: { id: 'GLDRUB_TOM' },
                },
            },
        },
    },
    commodity: {
        id: 'commodity',
        markets: {
            LBMA: {
                id: 'LBMA',
                securities: {
                    GOLD: { id: 'GOLD' }
                }
            }
        },
    },
}
