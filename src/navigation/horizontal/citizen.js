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
        id: 'citizens&participation',
        title: 'Citizens And Participation',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        action: 'read',
        resource: 'Auth',
        children: [
            {
                id: 'Citizens',
                title: 'Add citizen',
                icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_citizens',
                action: 'read',
                resource: 'show_citizens'
            },
            {
                id: 'Add Water licence',
                title: 'Add Water licence',
                icon: <CustomAvatar icon={ <FaHandHoldingWater style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/water/list',
                action: 'read',
                resource: 'water'
            },
            {
                id: 'ُAdd Electric licence',
                title: 'Add Electric licence',
                icon: <CustomAvatar icon={ <FcElectricity style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: 'Electric_licence/list',
                action: 'read',
                resource: 'Electric_licence'
            },
            {
                id: 'Building licence',
                title: 'Building licence',
                icon: <CustomAvatar icon={ <FaRegBuilding style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: 'building_licence/list',
                action: 'read',
                resource: 'building_licence'
            },

            {
                id: 'population',
                title: 'population',
                icon: <CustomAvatar icon={ <IoIosPeople style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '',
                action: 'read',
                resource: 'population'
            }
            // {
            //     id: 'ُCitizen pill',
            //     title: 'Citizen pill',
            //     icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
            //     navLink: ''
            // },
            // {
            //     id: 'Water counter',
            //     title: 'Water counter',
            //     icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
            //     navLink: ''
            // },
            // {
            //     id: 'ُReports',
            //     title: 'ُReports',
            //     icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
            //     navLink: ''
            // }

        ]
    }
]
