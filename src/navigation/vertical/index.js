// ** Navigation sections imports
import apps from './apps'
import pages from './pages'
import forms from './forms'
import tables from './tables'
import others from './others'
import dashboards from '../horizontal/dashboards'
import uiElements from './ui-elements'
import chartsAndMaps from './charts-maps'
import archive from '../horizontal/archive'
import definitions from "./definitions"
import Reports from '../horizontal/Reports'

// ** Merge & Export
export default [
    ...dashboards,
    ...archive,
    ...definitions,
    ...Reports
]
