import { lazy } from 'react'

const DashboardRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/dashboard')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'Auth'
    }
  },
  {
    path: '/dashboard/employee_permissions',
    component: lazy(() => import('../../views/dashboard/Permissions')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'show_employee_permissions'
    }
  },
  {
    path: '/dashboard/orgnization_details',
    component: lazy(() => import('../../views/dashboard/orgnization_details')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'show_orgnization_details'
    }
  },
  {
    path: '/dashboard/expand_permissions',
    component: lazy(() => import('../../views/dashboard/ExpandPermissions')),
    exact: true,
    meta: {
      action: 'manage',
      resource: 'all'
    }
  }

]

export default DashboardRoutes
