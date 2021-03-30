import React from 'react'

function Card(props) {
    return (
        <div className="Card">
            <img src={props.img} alt={"Press Draw Card!"}/>
        </div>
    )
}

export default Card
