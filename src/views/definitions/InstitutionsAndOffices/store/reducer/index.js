const initialState = {
    data: [],
    employee: [],
    columns: [],
    loading: true,
    handle_refresh: false,
    config: {
        TypeApi: '',
        url: '',
        title: '',
        dataTableTitle: ''
    },
    selectedDef: null
}

const Orginzations = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_ORG_DATA':
            if (action.id_selected) {
                const selectedDef = action.data.filter(item => item.id === +action?.id_selected)
                return { ...state, ...action, selectedDef }
            } else {
                return { ...state, ...action }

            }

        case 'ADD_Orginzation':
            let data = state.data
            const item = action.item
            const index = data.findIndex(itemData => itemData.id === item.id)
            // console.log(index)
            if (index >= 0) {
                data[index] = { ...item, no: (index + 1) }
            } else {
                data.unshift(item)
                data = data.map((item, index) => {
                    // console.log(index + 1)
                    return { ...item, no: (index + 1) }
                })
            }

            return { ...state, data, selectedDef: null }

        case 'GET_DEF':
            const selectedDef = state.data.filter(item => item.id === action.id)
            // console.log(selectedDef)
            return { ...state, selectedDef }

        case 'SET_LOADING':
            return { ...state, loading: false }

        case 'UNSET_LOADING':
            return { ...state, loading: false }

        case 'SET_REFRESH':
            return { ...state, handle_refresh: action.value }

        case 'DELETE_ORG':
            const updatedData = state.data.filter(item => item.id !== action.id.id)
            return { ...state, data: updatedData }

        default:
            return { ...state }

    }
}
export default Orginzations
