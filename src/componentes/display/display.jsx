import React from 'react'
import '../style.css'

function Display(props){
    return (
        <div className = 'containerDisplay'>
            <p className = 'nomer'>{props.nomer1} {props.operator} {props.nomer2}</p>
            <p className = 'hasil'>{props.hasil}</p>
        </div>
    )
}

export default Display