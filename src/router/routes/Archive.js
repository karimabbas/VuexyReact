import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ArchiveRoutes = [
  {
    path: '/archive/:type?/:archiveId?',
    exact: true,
    className: 'archive-application',
    meta: {
      action: 'read',
      resource: 'typeParams'
    },
    component: lazy(() => import('../../views/archive'))
  },
  {
    path: '/archive_print/:type?/:archiveId?',
    exact: true,
    layout: 'BlankLayout',
    className: 'archive-application',
    meta: {
      action: 'read',
      resource: 'typeParams'
    },
    component: lazy(() => import('../../views/archive/print/index.js'))
  }
]

export default ArchiveRoutes
