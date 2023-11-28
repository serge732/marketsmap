import { Component, FC, createContext, useContext, useState } from 'react'

interface AddNodeModalStoreValue {
    isOpen: boolean
    open(): void
    close(): void
}

const AppNodeModalStore = createContext({} as AddNodeModalStoreValue)

export function useAddNodeModalStore() {
    return useContext(AppNodeModalStore)
}

export function withAddNodeModalStore<T extends {}>(Component: FC<T>) {
    return function WithAddNodeModalStore(props: T) {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <AppNodeModalStore.Provider
                value={{
                    isOpen,
                    open() {
                        setIsOpen(true)
                    },
                    close() {
                        setIsOpen(false)
                    },
                }}>
                <Component {...props} />
            </AppNodeModalStore.Provider>
        )
    }
}
