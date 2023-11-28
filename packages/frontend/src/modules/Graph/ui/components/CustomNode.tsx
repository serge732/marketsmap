import dayjs from 'dayjs'
import Card from '@mui/material/Card'
import { useCallback, useEffect, useState } from 'react'
import {
    Handle,
    Position,
    useStore,
    NodeProps,
    ReactFlowState,
} from 'reactflow'
//
import { getNode } from 'api'
import { useAppStore } from 'store'
import type { GraphNode } from 'types'
import Grid from '@mui/material/Grid'

const connectionNodeIdSelector = (state: ReactFlowState) =>
    state.connectionNodeId

export default function CustomNode(props: NodeProps<GraphNode>) {
    const { id, data: initialNode } = props

    const connectionNodeId = useStore(connectionNodeIdSelector)

    const isConnecting = !!connectionNodeId
    const isTarget = connectionNodeId && connectionNodeId !== id

    const { from, till } = useAppStore()

    const [node, setNode] = useState<GraphNode>(initialNode)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchNode = useCallback(
        async function () {
            try {
                setIsLoading(true)

                if (!from || !till) throw new Error('invalid date params')

                const getNodeResult = await getNode({
                    input: {
                        engineId: node.engineId,
                        marketId: node.marketId,
                        secId: node.secId,
                        from: from.format('YYYY-MM-DD'),
                        till: till.format('YYYY-MM-DD'),
                    },
                })

                const { data: newNode, error: nodeError } = getNodeResult.data

                if (nodeError) throw new Error(nodeError)

                setNode({ ...node, ...newNode })
            } catch (error) {
                setError(`Ошибка: ${(error as Error).message}`)
            } finally {
                setIsLoading(false)
            }
        },
        [node?.engineId, node?.marketId, node?.secId, from, till],
    )

    useEffect(() => {
        fetchNode()
    }, [fetchNode])

    return (
        <Card
            className="customNode"
            variant="outlined"
            sx={{ width: 210, height: 90, padding: '24px' }}>
            <div>
                {!isConnecting && (
                    <Handle
                        className="customHandle"
                        position={Position.Right}
                        type="source"
                    />
                )}

                <Handle
                    className="customHandle"
                    position={Position.Left}
                    type="target"
                    isConnectableStart={false}
                />
                {isTarget ? (
                    <>Drop here</>
                ) : isLoading ? (
                    <>Загрузка...</>
                ) : error ? (
                    <>{error}</>
                ) : (
                    <div>
                        <Grid container>
                            <Grid item xs={5}>
                                SEC_ID
                            </Grid>
                            <Grid item xs={7}>
                                {node?.secId}
                            </Grid>
                            <Grid item xs={5}>
                                Цена
                            </Grid>
                            <Grid item xs={7}>
                                {node?.value}
                            </Grid>
                            <Grid item xs={5}>
                                Динамика
                            </Grid>
                            <Grid item xs={7}>
                                {node?.valueChangeSign! > 0 ? '+' : '-'}
                                {node?.valueChangePercents}
                            </Grid>
                            <Grid item xs={5}>
                                Начало
                            </Grid>
                            <Grid item xs={7}>
                                {dayjs(node?.begin).format('DD-MM-YYYY')}
                            </Grid>
                            <Grid item xs={5}>
                                Окончание
                            </Grid>
                            <Grid item xs={7}>
                                {dayjs(node?.end).format('DD-MM-YYYY')}
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
        </Card>
    )
}
