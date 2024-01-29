import { Home, Activity, ShoppingCart, Info, Key } from 'react-feather'
import Avatar from '@components/avatar'
import { GrMoney } from 'react-icons/gr'

const CustomAvatar = props => {
  return <Avatar color={ 'primary' } style={ { textAlign: 'center', marginLeft: '5px' } } icon={ props.icon } />
}
export default [
    {
        id: 'financial',
        title: 'financial',
        icon: <CustomAvatar icon={ <Home style={ { marginLeft: '0' } } size={ 14 } /> } />,
        icon: <GrMoney />,
        action: 'read',
        resource: 'Auth',
        children: [
            {
                id: 'financialForm1',
                title: 'financialForm1',
                icon: <CustomAvatar icon={ <Activity style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/financial/financialForm1',
                action: 'read',
                resource: 'financial'
            },
            {
                id: 'financialForm2',
                title: 'financialForm2',
                icon: <CustomAvatar icon={ <Activity style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/financial/financialForm1',
                action: 'read',
                resource: 'financial'
            }
            
        ]
    }
]
