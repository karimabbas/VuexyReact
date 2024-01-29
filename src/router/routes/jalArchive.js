import { lazy } from 'react'

const ArchiveRoutes = [
  {
    path: '/agenda_archive',
    exact: true,
    className: 'archive-application',
    meta: {
      action: 'read',
      resource: 'agenda_archieve'
    },
    component: lazy(() => import('../../views/agenda-archive'))
  },
  {
    path: '/agenda_report',
    exact: true,
    className: 'archive-application',
    meta: {
      action: 'read',
      resource: 'agenda_report'
    },
    component: lazy(() => import('../../views/agenda-archive/agenda-report'))
  }
]

export default ArchiveRoutes
