// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import ArchiveRoutes from './Archive'
import WaterRoute from './Water'
import AddDefinition from "./AddDefinition"
import jalArchive from './jalArchive'
// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
    ...DashboardRoutes,
    ...AppRoutes,
    ...PagesRoutes,
    ...UiElementRoutes,
    ...ExtensionsRoutes,
    ...PageLayoutsRoutes,
    ...FormRoutes,
    ...TablesRoutes,
    ...ChartMapsRoutes,
    ...ArchiveRoutes,
    ...WaterRoute,
    ...AddDefinition,
    ...jalArchive
]

export { DefaultRoute, TemplateTitle, Routes}
