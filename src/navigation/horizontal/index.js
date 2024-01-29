// ** Navigation sections imports
// import apps from './apps'
// import pages from './pages'
// import others from './others'
import dashboards from './dashboards'
// import uiElements from './ui-elements'
// import formsAndTables from './forms-tables'
// import chartsAndMaps from './charts-maps'
import archive from './archive'
// import citizen from './citizen'
// import employeeAndDepartment from "./employee-and-department"
// import institutions_and_offices from './institutions_and_offices'
// import projects from './projects'
// import assets from "./assets"
import Reports from './Reports'
// import customer from "./customer"
import definitions from "./definitions"
import jalArchive from './jalArchive'
import financial from './financial'
export default [
    ...dashboards,
    ...archive,
    ...jalArchive,
    // ...employeeAndDepartment,
    // ...customer,
    // ...citizen,
    // ...institutions_and_offices,
    // ...assets,
    // ...projects,
    ...Reports,
    ...definitions,
    ...financial

]

