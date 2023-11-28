import { createContext, useContext, useState } from 'react'
import type { FC } from 'react'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import type { GraphConnection, GraphNode } from 'types'

interface AppStoreValue {
    nodes: GraphNode[]
    addNode(node: GraphNode): void
    changeNodes(nodes: Omit<GraphNode, 'id' | 'engineId' | 'marketId'>[]): void
    connections: GraphConnection[]
    changeConnections(
        connection: Omit<
            GraphConnection,
            | 'sourceEngineId'
            | 'sourceMarketId'
            | 'targetEngineId'
            | 'targetMarketId'
        >[],
    ): void
    from: Dayjs | null
    setFrom(dayjs: Dayjs | null): void
    till: Dayjs | null
    setTill(dayjs: Dayjs | null): void
}

const AppStore = createContext({} as AppStoreValue)

export function useAppStore() {
    return useContext(AppStore)
}

export function withAppStore<T extends {}>(Component: FC<T>) {
    return function WithAppStore(props: T) {
        const [nodes, setNodes] = useState<GraphNode[]>([
            {
                engineId: 'currency',
                marketId: 'selt',
                secId: 'GLDRUB_TOM',
            },
            {
                engineId: 'currency',
                marketId: 'selt',
                secId: 'USD000UTSTOM',
            },
        ])
        const findNodeBySecId = function (secId: string) {
            return nodes.find((node) => node.secId === secId)
        }
        const [connections, setConnections] = useState<GraphConnection[]>([])
        const [from, setFrom] = useState<Dayjs | null>(dayjs('2023-02-01'))
        const [till, setTill] = useState<Dayjs | null>(dayjs('2023-11-17'))
        return (
            <AppStore.Provider
                value={{
                    nodes,
                    addNode(newNode) {
                        setNodes([...nodes, newNode])
                    },
                    changeNodes(newNodes) {
                        let updatedNodes = nodes

                        for (const node of newNodes) {
                            const nodeIndex = updatedNodes.findIndex(
                                ({ secId }) => secId === node.secId,
                            )
                            updatedNodes.splice(nodeIndex, 1, {
                                ...updatedNodes[nodeIndex],
                                ...node,
                            })
                        }

                        setNodes(updatedNodes)
                    },
                    connections,
                    changeConnections(newConnections) {
                        let updatedConnections = connections

                        for (const connection of newConnections) {
                            const sourceNode = findNodeBySecId(
                                connection.sourceSecId,
                            )
                            const {
                                engineId: sourceEngineId,
                                marketId: sourceMarketId,
                            } = sourceNode || {}
                            const targetNode = findNodeBySecId(
                                connection.targetSecId,
                            )
                            const {
                                engineId: targetEngineId,
                                marketId: targetMarketId,
                            } = targetNode || {}
                            const connectionIndex =
                                updatedConnections.findIndex(
                                    ({ id }) => id === connection.id,
                                )
                            updatedConnections.splice(connectionIndex, 1, {
                                ...connection,
                                sourceEngineId,
                                sourceMarketId,
                                targetEngineId,
                                targetMarketId,
                            })
                        }

                        setConnections(updatedConnections)
                    },
                    till,
                    setTill,
                    from,
                    setFrom,
                }}>
                <Component {...props} />
            </AppStore.Provider>
        )
    }
}
