import { useCallback, useEffect } from 'react'

import ReactFlow, {
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
} from 'reactflow'
import type {
    Edge as ReactFlowEdge,
    OnConnect,
    DefaultEdgeOptions,
} from 'reactflow'

import { useAppStore } from 'store'
import type { GraphNode } from 'types'

import CustomNode from './components/CustomNode'
import FloatingEdge from './components/FloatingEdge'
import CustomConnectionLine from './components/CustomConnectionLine'

import 'reactflow/dist/style.css'
import './style.css'

const initialEdges: ReactFlowEdge[] = []

const connectionLineStyle = {
    strokeWidth: 2,
    stroke: 'black',
}

const nodeTypes = {
    custom: CustomNode,
}

const edgeTypes = {
    floating: FloatingEdge,
}

const defaultEdgeOptions: DefaultEdgeOptions = {
    style: { strokeWidth: 2, stroke: 'black' },
    type: 'floating',
    markerEnd: {
        type: MarkerType.Arrow,
        color: 'black',
    },
}

function adaptNodes(nodes: GraphNode[]) {
    return nodes.map((node, i) => ({
        id: node.secId,
        type: 'custom',
        position: {
            x:
                node.position?.x ||
                (nodes[nodes.length - 1].position?.x || i * 180) + 180,
            y:
                node.position?.y ||
                (nodes[nodes.length - 1].position?.y || i * 60) + 60,
        },
        data: node,
    }))
}

export const Graph = () => {
    const { nodes, connections, changeConnections, changeNodes } = useAppStore()
    console.log({ connections })

    const [graphNodes, setGraphNodes, onGraphNodesChange] = useNodesState(
        adaptNodes(nodes),
    )
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const onConnect: OnConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    )

    useEffect(() => {
        if (nodes.length !== graphNodes.length) {
            setGraphNodes(adaptNodes(nodes))
        }
    }, [nodes, setGraphNodes])

    useEffect(() => {
        changeNodes(
            graphNodes.map((graphNode) => ({
                secId: graphNode.id,
                position: graphNode.position,
            })),
        )
    }, [graphNodes])

    useEffect(() => {
        changeConnections(
            edges.map((edge) => ({
                id: edge.id,
                sourceSecId: edge.source,
                targetSecId: edge.target,
            })),
        )
    }, [edges])

    return (
        <ReactFlow
            nodes={graphNodes}
            edges={edges}
            onNodesChange={onGraphNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineComponent={CustomConnectionLine}
            connectionLineStyle={connectionLineStyle}
        />
    )
}
