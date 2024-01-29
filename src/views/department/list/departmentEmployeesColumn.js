export const departmentEmployeesColumn = () => [

    {
        name: '#',
        selector: 'no',
        sortable: true,
        center: true,
        minWidth: '70px',
        maxWidth: '100px'
    },
    {
        name: 'اسم الموظف',
        selector: 'nick_name',
        center: true,
        sortable: true,
        minWidth: '200px'
    },
    {
        name: 'المسمي الوظيفي',
        selector: 'job_name',
        sortable: true,
        center: true,
        minWidth: '300px'
    },
    {
        name: 'تاريخ البداية',
        selector: 'start_date',
        sortable: true,
        center: true,
        minWidth: '200px'
    }
]