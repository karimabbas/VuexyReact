import { icon } from 'leaflet'
import { Box, Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Users, CheckCircle, Code, Codesandbox } from 'react-feather'
import { ImOffice } from "react-icons/im"
import { AiOutlineBank } from "react-icons/ai"
import { GiReceiveMoney } from "react-icons/gi"
import { FaHotel } from "react-icons/fa"
import { RiHotelFill } from "react-icons/ri"


import Avatar from '@components/avatar'
const CustomAvatar = props => {
    return <Avatar color={ 'primary' } style={ { textAlign: 'center', marginLeft: '5px' } } icon={ props.icon } />
}

export default [
    {
        id: 'Institutions_and_offices',
        title: 'Institutions and offices',
        icon: <CustomAvatar icon={ <ImOffice style={ { marginLeft: '0' } } size={ 14 } /> } />,
        action: 'read',
        resource: 'Auth',
        children: [
            {
                id: 'Add Institutions',
                title: 'Add Institutions',
                icon: <CustomAvatar icon={ <FaHotel style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_orginzation',
                action: 'read',
                resource: 'show_orginzation'
            },
            {
                id: 'ُAdd Supplier',
                title: 'Add Supplier',
                icon: <CustomAvatar icon={ <GiReceiveMoney style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_suppliers',
                action: 'read',
                resource: 'show_suppliers'
            },
            {
                id: 'ُAdd Bank',
                title: 'Add Bank',
                icon: <CustomAvatar icon={ <AiOutlineBank style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_banks',
                action: 'read',
                resource: 'show_banks'
            },
            {
                id: 'Add engineering office',
                title: 'Add engineering office',
                icon: <CustomAvatar icon={ <RiHotelFill style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_enginering',
                action: 'read',
                resource: 'show_enginering'
            },
            {
                id: 'Add Space Office',
                title: 'Add Space Office',
                icon: <CustomAvatar icon={ <RiHotelFill style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_space',
                action: 'read',
                resource: 'show_space'
            }
        ]
    }
]
