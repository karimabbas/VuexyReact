import { Home, Activity, ShoppingCart, Info, Key } from 'react-feather'
import employeeAndDepartment from "./employee-and-department"
import citizen from './citizen'
import institutions_and_offices from './institutions_and_offices'
import projects from './projects'
import assets from "./assets"
import customer from "./customer"
import Avatar from '@components/avatar'
const CustomAvatar = props => {
  return <Avatar color={ 'primary' } style={ { textAlign: 'center', marginLeft: '5px' } } icon={ props.icon } />
}
export default [
    {
        id: 'definitions',
        title: 'definitions',
        icon: <CustomAvatar icon={ <Home style={ { marginLeft: '0' } } size={ 14 } /> } />,
        icon: <Home />,
        action: 'read',
        resource: 'Auth',
        children: [
            ...employeeAndDepartment,
            ...customer,
            ...citizen,
            ...institutions_and_offices,
            ...assets,
            ...projects
        ]
    }
]
