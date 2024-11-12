import MovieItem from "./MovieItem"
import UserItem from "./UserItem"

const ItemFactory = ({type, props}) => {
    switch (type) {
        case 'movies':
            return <MovieItem {...props} />
        case 'users':
            return <UserItem {...props} />
        default:
            <p>{`Type ${type} is Unknown`}</p>
    }
} 

export default ItemFactory