import Card from '@mui/material/Card'
import UserForm from './UserForm'
import MovieForm from './MovieForm';


const FormFactory = ({type, props}) => {
    let formComponent;

    switch (type) {
        case 'users': 
            formComponent = <UserForm {...props} />
            break;
        case 'movies':
            formComponent = <MovieForm {...props} />
            break;
        default:
            formComponent = <p>{`Type ${type} is Unknown`}</p>
    }

    return (
        <Card raised={true} sx={{ p: '1rem 2rem', width: '25%'   }}>
            {formComponent}
        </Card>
    )
}

export default FormFactory