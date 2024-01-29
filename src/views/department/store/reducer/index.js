const initialState = {
    data: [],
    employees: [],
    columns: [],
    loading: false,
    selectedDept: {},
    config: {
        TypeApi: '',
        url: '',
        title: 'الاقسام',
        dataTableTitle: 'الاقسام'
    },
    selectedDef: null
}

const Departments = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_Department':
            if (action.id_selected) {
                const selectedDef = action.data.filter(item => item.id === +action?.id_selected)
                return { ...state, ...action, selectedDef }
            } else {
                return { ...state, ...action }

            }

        case 'ADDDepartment':
            let data = state.data
            const item = action.item
            const index = data.findIndex(itemData => itemData.id === item.id)
            // console.log(index)
            if (index >= 0) {
                data[index] = {...item, no: (index + 1)}
            } else {
                data.unshift(item)
                data = data.map((item, index) => {
                    console.log(index + 1)

                    return {...item, no: (index + 1)}
                })
            }

            return {...state, data}
        case 'GetDepartment':
            const selectedDept = state.data.filter(item => item.id === action.id)
            return {...state, selectedDept}
        case 'DELETEDepartment':
            const updatedData = state.data.filter(item => item.id !== action.id.id)
            return {...state, data: updatedData}
        case 'SET_LOADING':
            return {...state, loading: false}
        case 'UNSET_LOADING':
            return {...state, loading: false}
        default:
            return {...state}
    }
}
export default Departments