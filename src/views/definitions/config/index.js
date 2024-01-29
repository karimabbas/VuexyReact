export const getConfig = (def) => {
    let config = {
        TypeApi: '',
        url: '',
        title: '',
        dataTableTitle: ''
    }
    if (def === 'show_banks') {
        config = {
            TypeApi: 'banks',
            title: 'البنوك',
            dataTableTitle: 'قائمة البنوك'
        }

    } else if (def === 'show_orginzation') {
        config = {
            TypeApi: 'orginzation',
            title: 'المؤسسات',
            dataTableTitle: 'قائمة المؤسسات'
        }
    } else if (def === 'show_employee') {
        config = {
            title: 'الموظفين',
            dataTableTitle: 'قائمة الموظفين'
        }
    } else if (def === 'show_suppliers') {
        config = {
            TypeApi: 'suppliers',
            title: 'الموردين',
            dataTableTitle: 'قائمة الموردين'
        }
    } else if (def === 'show_enginering') {
        config = {
            TypeApi: 'enginering',
            title: 'المكتب الهندسى',
            dataTableTitle: 'قائمة المكاتب الهندسية'
        }
    } else if (def === 'show_space') {
        config = {
            TypeApi: 'space',
            title: 'مكتب المساحة',
            dataTableTitle: 'قائمة مكاتب المساحة'
        }
    } else if (def === 'projects') {
        config = {
            title: ' المشروع',
            dataTableTitle: 'قائمة المشاريع',
            TypeApi: 'projects'
        }
    } else if (def === 'show_gardens_lands') {
        config = {
            TypeApi: 'Gardens_lands',
            title: 'الحدائق والأراضى',
            dataTableTitle: 'قائمة الحدائق والأراضى'
        }
    } else if (def === 'show_warehouses') {
        config = {
            TypeApi: 'warehouses',
            title: 'المستودعات',
            dataTableTitle: ' قائمة المستودعات'
        }
    } else if (def === 'show_buildings') {
        config = {
            TypeApi: 'buildings',
            title: 'المبانى',
            dataTableTitle: 'قائمة المبانى'
        }
    }
    return config
}

