const initialState = {
    data: [],
    columns: [],
    loading: true,
    config: {
        TypeApi: '',
        url: '',
        title: '',
        dataTableTitle: ''
    },
    selectedDef: null
}

const Definitions = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_DATA':
            return { ...state, ...action }

        case 'ADD_DEFINITION':
            let data = state.data
            const item = action.item
            // console.log(item.id)
            const index = data.findIndex(itemData => itemData.id === item.id)
            // console.log(index)
            if (index >= 0) {
                const rowId = data[index].rowId
                data[index] = { ...item, rowId }
            } else {
                data.unshift(item)
                data = data.map((item, index) => {
                    return { ...item, rowId: index + 1 }
                })
            }


        case 'GET_DEF':
            const selectedDef = state.data.filter(item => item.id === action.id)
            console.log(selectedDef)
            return { ...state, selectedDef }

        case 'SET_LOADING':
            return { ...state, loading: false }

        case 'UNSET_LOADING':
            return { ...state, loading: false }

        case 'DELETE':
            const updatedData = state.data.filter(item => item.id !== action.id.id)
            return { ...state, data: updatedData }

        default:
            return { ...state }

    }
}
export default Definitions
