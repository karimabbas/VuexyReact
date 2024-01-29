// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
import users from '@src/views/apps/user/store/reducer'
import email from '@src/views/apps/email/store/reducer'
import invoice from '@src/views/apps/invoice/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'
import archives from '@src/views/archive/store/reducer'
// import Definitions from '../../views/definitions/reducer'
import Reports from '../../views/ReportsPages/reducer'
import Departments from "../../views/department/store/reducer"
import Vehicles from "../../views/vehicle/store/reducer"
import archiveInfo from '../../views/our-componnets/ArchiveInfo/store/reducer'
import employeePermissions from '../../views/dashboard/Permissions/store/reducer'
import Constants from "../../views/our-componnets/ExtensionModel/Constants/reducer"
import Address from "../../views/our-componnets/ExtensionModel/Address/reducer"
import Orginzations from "../../views/definitions/InstitutionsAndOffices/store/reducer"
import ASSETS from "../../views/definitions/BuilidingAndWarehouse/store/reducer"
import PROJECTS from '../../views/definitions/projects/store/reducer'
import Citizens from '../../views/definitions/citizen/store/reducer'
import Employees from "../../views/definitions/employee/store/reducer"
import Customers from "../../views/definitions/customer/store/reducer"
import expandPermissions from '../../views/dashboard/ExpandPermissions/store/reducer'
import Equipments from '../../views/equipment/store/reducer'
import meetingArchive from '../../views/agenda-archive/store/reducer'
const rootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  archives,
  archiveInfo,
  Reports,
  Departments,
  Vehicles,
  employeePermissions,
  Constants,
  Address,
  Orginzations,
  ASSETS,
  PROJECTS,
  Citizens,
  Employees,
  Customers,
  expandPermissions,
  Equipments,
  meetingArchive
})

export default rootReducer
