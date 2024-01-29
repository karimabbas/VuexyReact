const initialState = {
    data: [],
    columns: [],
    loading: false,
    selected: {},
    config: {
        TypeApi: '',
        url: '',
        title: '',
        dataTableTitle: ''
    },
    selectedDef: null
}

const Constants = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_Constant':
            return { ...state, ...action }


        case 'ADDConstant':
            const data = state.data
            const item = action.item
            const parent = item.parent
            let constantsInParent = data[`parent${parent}`]
            const index = constantsInParent.findIndex(itemData => itemData.id === item.id)
            if (index >= 0) {
                constantsInParent[index] = { ...item, rowId: (index + 1) }
            } else {
                constantsInParent.unshift(item)
                constantsInParent = constantsInParent.map((item, index) => {
                    return { ...item, rowId: (index + 1) }
                })
            }
            data[`parent${parent}`] = constantsInParent

            return { ...state, data, selected: {} }


        case 'DELETEConstant':
            const tempData = state.data
            const updatedData = state.data[`parent${action.parent}`].filter(item => item.id !== action.id.id)
            tempData[`parent${action.parent}`] = updatedData
            return { ...state, data: tempData, selected: {} }

        case 'SETSelectedConstant':
            const selected = state.data[`parent${action?.row?.parent}`].filter(item => item.id === action?.row?.id)
            return { ...state, selected }

        case 'SET_LOADING':
            return { ...state, loading: false }

        case 'UNSET_LOADING':
            return { ...state, loading: false }

        default:
            return { ...state }
    }
}
export default Constants