import React from 'react'
import { getStraightPath } from 'reactflow'
import type { ConnectionLineComponent } from 'reactflow'

const CustomConnectionLine: ConnectionLineComponent = function (props) {
    const { fromX, fromY, toX, toY, connectionLineStyle } = props

    const [edgePath] = getStraightPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
    })

    return (
        <g>
            <path style={connectionLineStyle} fill="none" d={edgePath} />
            <circle cx={toX} cy={toY} fill="black" r={3} />
        </g>
    )
}

export default CustomConnectionLine
