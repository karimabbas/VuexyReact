import { icon } from 'leaflet'
import { Box, Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Users, CheckCircle, Code } from 'react-feather'
import Avatar from '@components/avatar'
const CustomAvatar = props => {
    return <Avatar color={ 'primary' } style={ { textAlign: 'center', marginLeft: '5px' } } icon={ props.icon } />
}

import { FaHandHoldingWater, FaRegBuilding } from "react-icons/fa"
import { FcElectricity } from "react-icons/fc"
import { IoIosPeople } from "react-icons/io"

export default [
    {
        id: 'customer',
        title: 'Customers',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        action: 'read',
        resource: 'Auth',
        children: [
            {
                id: 'addCustomer',
                title: 'Add Customer',
                icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_customer',
                action: 'read',
                resource: 'show_customer'
            }
        ]
    }
]
