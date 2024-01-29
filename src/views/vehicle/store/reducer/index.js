const initialState = {
    data: [],
    columns: [],
    loading: false,
    handle_refresh: false,
    config: {
        TypeApi: '',
        url: '',
        title: 'السيارات',
        dataTableTitle: 'السيارات'
    },
    selectedVeh: null
}

const Vehicles = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_VEHICLE_DATA':
            if (action.id_selected) {
                const selectedDef = action.data.filter(item => item.id === +action?.id_selected)
                return { ...state, ...action, selectedDef }
            } else {
                return { ...state, ...action }

            }
            
        case 'ADD_VEHICLE':
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

            return { ...state, data, selectedVeh: null }
        case 'DELETE':
            const updatedData = state.data.filter(item => item.id !== action.id.id)
            return { ...state, data: updatedData }
        case 'SET_LOADING':
            return { ...state, loading: false }
        case 'UNSET_LOADING':
            return { ...state, loading: false }
        case 'SET_VEH_REFRESH':
            return { ...state, handle_refresh: action.value }
        case 'GET_VEHICLE':
            const selectedVeh = state.data.filter(item => item.id === action.id)
            // console.log(selectedDef)
            return { ...state, selectedVeh }
        default:
            return { ...state }
    }
}
export default Vehicles