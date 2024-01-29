import { lazy } from 'react'

const AddDefinition = [
    {
        path: '/add&edit/:def/:defId?',
        component: lazy(() => import('../../views/definitions')),
        meta: {
            action: 'read',
            resource: 'typeParams'
        }
    },
    {
        path: '/equip/:equipId?',
        component: lazy(() => import('../../views/equipment')),
        meta: {
            action: 'read',
            resource: 'show_equipment'
        }
    },
    {
        path: '/vehicle/:vehicleId?',
        component: lazy(() => import('../../views/vehicle')),
        meta: {
            action: 'read',
            resource: 'show_vehicles'
        }
    },
    {
        path: '/show_department/:deptId?',
        component: lazy(() => import('../../views/department')),
        meta: {
            action: 'read',
            resource: 'show_department'
        }
    },
    {
        path: '/Reports/:def',
        component: lazy(() => import('../../views/ReportsPages')),
        meta: {
            action: 'read',
            resource: 'report_archieve'
        }
    },
    {
        path: '/financial',
        component: lazy(() => import('../../views/financial/lol')),
        meta: {
            action: 'read',
            resource: 'financial'
        }
    }
]

export default AddDefinition
