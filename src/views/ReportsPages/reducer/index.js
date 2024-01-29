const initialState = {
    data: [],
    columns: [],
    loading: false,
    config: {
        TypeApi: '',
        dataTableTitle: ''
    }
}

const Reports = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, ...action }
        case 'SET_LOADING':
            return { ...state, loading: true }
        case 'UNSET_LOADING':
            return { ...state, loading: false }
        case 'RESTORE':
            const updatedData = state.data.filter(item => item.id !== action.id.id)
            return { ...state, data: updatedData }
        case 'RESET':
            return { ...state, data: [] }
        default:
            return { ...state }

    }
}
export default Reports
