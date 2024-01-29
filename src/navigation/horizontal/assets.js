import {
    Codesandbox,
    Tool, Truck
} from 'react-feather'
import { BsBuilding } from "react-icons/bs"
import { GiTreeGrowth } from "react-icons/gi"
import { FaWarehouse } from "react-icons/fa"
import Avatar from '@components/avatar'
const CustomAvatar = props => {
    return <Avatar color={ 'primary' } style={ { textAlign: 'center', marginLeft: '5px' } } icon={ props.icon } />
}
export default [
    {
        id: 'assets',
        title: 'assets',
        icon: <CustomAvatar icon={ <Codesandbox style={ { marginLeft: '0' } } size={ 14 } /> } />,
        action: 'read',
        resource: 'Auth',
        children: [
            {
                id: 'Equipment',
                title: 'Equipment',
                icon: <CustomAvatar icon={ <Tool style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/equip',
                action: 'read',
                resource: 'show_equipment'
            },
            {
                id: 'Vehicles',
                title: 'Vehicles',
                icon: <CustomAvatar icon={ <Truck style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/vehicle',
                action: 'read',
                resource: 'show_vehicles'
            },
            {
                id: 'Building',
                title: 'Building',
                icon: <CustomAvatar icon={ <BsBuilding style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_buildings',
                action: 'read',
                resource: 'show_buildings'
            },
            {
                id: 'Lands and gardens',
                title: 'Lands and gardens',
                icon: <CustomAvatar icon={ <GiTreeGrowth style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_gardens_lands',
                action: 'read',
                resource: 'show_gardens_lands'
            },
            {
                id: 'warehouses',
                title: 'warehouses',
                icon: <CustomAvatar icon={ <FaWarehouse style={ { marginLeft: '0' } } size={ 14 } /> } />,
                navLink: '/add&edit/show_warehouses',
                action: 'read',
                resource: 'show_warehouses'
            }

        ]
    }
]
