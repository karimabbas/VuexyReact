const initialState = {
    data: [],
    columns: [],
    loading: true,
    employees: [],
    handle_refresh: false,
    config: {
        TypeApi: '',
        url: '',
        title: '',
        dataTableTitle: ''
    },
    selectedEqu: null
}

const Equipments = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_EQU_DATA':
            if (action.id_selected) {
                const selectedDef = action.data.filter(item => item.id === +action?.id_selected)
                return { ...state, ...action, selectedDef }
            } else {
                return { ...state, ...action }

            }

        case 'ADD_EQUIPMENT':
            let data = state.data
            const item = action.item
            const index = data.findIndex(itemData => itemData.id === item.id)
            if (index >= 0) {
                data[index] = { ...item, no: (index + 1) }
            } else {
                data.unshift(item)
                data = data.map((item, index) => {
                    return { ...item, no: (index + 1) }
                })
            }

            return { ...state, data, selectedEqu: null }

        case 'GET_EQUIPMENT':
            const selectedEqu = state.data.filter(item => item.id === action.id)
            return { ...state, selectedEqu }

        case 'SET_LOADING':
            return { ...state, loading: false }

        case 'UNSET_LOADING':
            return { ...state, loading: false }

        case 'SET_Equ_REFRESH':
            return { ...state, handle_refresh: action.value }
        case 'DELETE_EQUIPMENT':
            const updatedData = state.data.filter(item => item.id !== action.id.id)
            return { ...state, data: updatedData }

        default:
            return { ...state }

    }
}
export default Equipments
