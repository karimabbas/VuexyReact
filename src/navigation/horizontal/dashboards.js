import { Home, Info, Key } from 'react-feather'
import Avatar from '@components/avatar'
const CustomAvatar = props => {
  return <Avatar color={ 'primary' } style={ { textAlign: 'center', marginLeft: '5px' } } icon={ props.icon } />
}
export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <CustomAvatar icon={ <Home style={ { marginLeft: '0' } } size={ 14 } /> } />,
    action: 'read',
    resource: 'Auth',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        action: 'read',
        resource: 'Auth',
        icon: <CustomAvatar icon={ <Home style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/dashboard'
      },
      {
        id: 'orgnization_details',
        title: 'orgnization details',
        action: 'manage',
        resource: 'all',
        icon: <CustomAvatar icon={ <Info style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/dashboard/orgnization_details'
      },
      {
        id: 'expand_permissions',
        title: 'expand_permissions',
        action: 'manage',
        resource: 'all',
        icon: <CustomAvatar icon={ <Key style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/dashboard/expand_permissions'
      },
      {
        id: 'employee_permissions',
        title: 'employee_permissions',
        action: 'read',
        resource: 'show_employee_permissions',
        icon: <CustomAvatar icon={ <Key style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/dashboard/employee_permissions'
      }
    ]
  }
]
