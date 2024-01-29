import citizen from '../horizontal/citizen'
import institutions_and_offices from '../horizontal/institutions_and_offices'
import projects from '../horizontal/projects'
import assets from "../horizontal/assets"
import customer from "../horizontal/customer"
import employeeAndDepartment from "../horizontal/employee-and-department"

export default [
    {
        header: 'definitions'
    },
    ...employeeAndDepartment,
    ...customer,
    ...citizen,
    ...institutions_and_offices,
    ...assets,
    ...projects
]
