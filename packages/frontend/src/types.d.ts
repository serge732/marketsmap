import { Position } from 'reactflow'
//
import { Node } from 'api/schema'

interface GraphNode extends Node {
    position?: XYPosition
}

interface GraphConnection {
    id: string
    sourceSecId: string
    targetSecId: string
    sourceEngineId?: string
    sourceMarketId?: string
    targetEngineId?: string
    targetMarketId?: string
}
