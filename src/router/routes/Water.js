import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const WaterRoute = [
  {
    path: '/water/list',
    component: lazy(() => import('../../views/water/list')),
    meta: {
      action: 'read',
      resource: 'water'
    }
  }
]

export default WaterRoute
