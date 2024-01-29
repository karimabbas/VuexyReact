import { Box, Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Codesandbox, Aperture } from 'react-feather'
import Avatar from '@components/avatar'
const CustomAvatar = props => {
    return <Avatar color={ 'primary' } style={ { textAlign: 'center', marginLeft: '5px' } } icon={ props.icon } />
}

import { AiOutlineProject } from "react-icons/ai"
import { GrNewWindow } from "react-icons/gr"


export default [
  {
    id: 'Projects',
    title: 'Projects',
    // icon: <CustomAvatar icon={ <AiOutlineProject style={ { marginLeft: '0' } } size={ 14 } /> } />,
    action: 'read',
    resource: 'Auth',
    children: [
      {
        id: 'Add project',
        title: 'Add project',
        // icon: <CustomAvatar icon={ <GrNewWindow style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/add&edit/show_projects',
        action: 'read',
        resource: 'show_projects'
      }
    ]
  }
]
