import Card from '@mui/material/Card'
import UserForm from './UserForm'
import MovieForm from './MovieForm';
import MemberForm from './MemberForm';


const FormFactory = ({type, props}) => {
    let formComponent;

    switch (type) {
        case 'users': 
            formComponent = <UserForm {...props} />
            break;
        case 'movies':
            formComponent = <MovieForm {...props} />
            break;
        case 'subscriptions':
            formComponent = <MemberForm {...props}/>
            break
        default:
            formComponent = <p>{`Type ${type} is Unknown`}</p>
    }

    return (
        <Card raised={true} sx={{ p: '1rem 2rem', width: '55%'   }}>
            {formComponent}
        </Card>
    )
}

export default FormFactory