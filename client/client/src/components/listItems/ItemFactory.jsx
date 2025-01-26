import { Card } from "@mui/material"
import { useState } from "react"
import { motion, useMotionValue, useTransform } from 'framer-motion'

import MovieItem from "./MovieItem"
import UserItem from "./UserItem"
import SubscriptionItem from "./SubscriptionItem"
import TiltCard from "../animated/TiltCard"

const ItemFactory = ({ type, props }) => {

let itemComponent

    switch (type) {
        case 'movies':
            itemComponent = <MovieItem {...props} />
            break
        case 'users':
            itemComponent = <UserItem {...props} />
            break
        case 'subscriptions':
            itemComponent = <SubscriptionItem {...props} />
            break
        default:
            itemComponent = <p>{`Type ${type} is Unknown`}</p>
    }

    return (

<TiltCard>
    {itemComponent}
</TiltCard>
                    

    )

    
}

export default ItemFactory