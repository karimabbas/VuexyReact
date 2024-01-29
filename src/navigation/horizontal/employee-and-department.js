import {
  Box,
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
  Users
} from 'react-feather'
import Avatar from '@components/avatar'
const CustomAvatar = props => {
  return <Avatar color={ 'primary' } style={ { textAlign: 'center', marginLeft: '5px' } } icon={ props.icon } />
}

export default [
  {
    id: 'emp&dept',
    title: 'emp&dept',
    icon: <CustomAvatar icon={ <User style={ { marginLeft: '0' } } size={ 14 } /> } />,
    action: 'read',
    resource: 'Auth',
    children: [
      {
        id: 'emp',
        title: 'add employees',
        icon: <CustomAvatar icon={ <User style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/add&edit/show_employee',
        action: 'read',
        resource: 'show_employee'
      },
      {
        id: 'dept',
        title: 'department',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/show_department',
        action: 'read',
        resource: 'show_department'
      }
    ]
  }
]
