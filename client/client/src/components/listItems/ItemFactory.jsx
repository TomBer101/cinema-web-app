import { Card } from "@mui/material"
import MovieItem from "./MovieItem"
import UserItem from "./UserItem"
import SubscriptionItem from "./SubscriptionItem"

const ItemFactory = ({type, props}) => {

    let itemComponent

    console.log("Item Factory props: ", props);
    

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
            itemComponent =<p>{`Type ${type} is Unknown`}</p>
    }

    return (
        <Card raised={true} sx={{ p: '1rem 2rem', width: '60%'   }}>
            {itemComponent}
        </Card>
    )
} 

export default ItemFactory