const initialState = {
    cities: [],
    towns: [],
    regions: [],
    loading: false,
    selectedCity: {},
    selectedTown: {},
    selectedRegion: {},
    config: {
        TypeApi: '',
        url: '',
        title: '',
        dataTableTitle: ''
    },
    selectedDef: null
}

const Address = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_Address':
            const allCities = action?.data?.cities ?? []
            const allTowns = action?.data?.towns ?? []
            const allRegions = action?.data?.regions ?? []
            return {...state, cities: allCities, towns: allTowns, regions: allRegions, ...action}


        case 'ADDCity':
            let cities = state?.cities
            const newCity = action.item
            const cityIndex = cities.findIndex(itemData => itemData.id === newCity.id)
            if (cityIndex >= 0) {
                cities[cityIndex] = {...newCity, rowId: (cityIndex + 1)}
            } else {
                cities.unshift(newCity)
                cities = cities.map((item, index) => {
                    return {...item, rowId: (index + 1)}
                })
            }
            return {...state, cities, selectedCity: {}, selectedTown: {}, selectedRegion: {}}

        case 'ADDTown':
            const towns = state?.towns
            const newTown = action.item
            const parentCity = newTown.city_id
            let townsInParent = towns[`parent${parentCity}`]
            if (townsInParent === null || townsInParent === undefined) {
                towns[`parent${parentCity}`] = []
                townsInParent = towns[`parent${parentCity}`]
            }
            const townIndex = townsInParent.findIndex(itemData => itemData.id === newTown.id)
            if (townIndex >= 0) {
                townsInParent[townIndex] = {...newTown, rowId: (townIndex + 1)}
            } else {
                townsInParent.unshift(newTown)
                townsInParent = townsInParent.map((item, index) => {
                    return {...item, rowId: (index + 1)}
                })
            }
            towns[`parent${parentCity}`] = townsInParent
            return {...state, towns, selectedCity: {}, selectedTown: {}, selectedRegion: {}}

        case 'ADDRegion':
            const regions = state?.regions
            const newRegion = action.item
            const parentTown = newRegion.town_id
            let regionsInParent = regions[`parent${parentTown}`]
            if (regionsInParent === null || regionsInParent === undefined) {
                regions[`parent${parentTown}`] = []
                regionsInParent = regions[`parent${parentTown}`]
            }
            const index = regionsInParent.findIndex(itemData => itemData.id === newRegion.id)
            if (index >= 0) {
                regionsInParent[index] = {...newRegion, rowId: (index + 1)}
            } else {
                regionsInParent.unshift(newRegion)
                regionsInParent = regionsInParent.map((item, index) => {
                    return {...item, rowId: (index + 1)}
                })
            }
            regions[`parent${parentTown}`] = regionsInParent
            return {...state, regions, selected: {}}


        case 'DELETECity':
            const updatedCities = state.cities.filter(item => item.id !== action.id)
            return {...state, cities: updatedCities, selectedCity: {}}


        case 'DELETETown':
            console.log(action)
            const tempTown = state.towns
            const updatedTown = state.towns[`parent${action.parent}`].filter(item => item.id !== action.id)
            tempTown[`parent${action.parent}`] = updatedTown
            return {...state, towns: tempTown, selectedTown: {}}


        case 'DELETERegions':
            const tempRegions = state.regions
            const updatedRegions = state.regions[`parent${action.parent}`].filter(item => item.id !== action.id)
            tempRegions[`parent${action.parent}`] = updatedRegions
            return {...state, data: tempRegions, selectedRegion: {}}


        case 'SETSelectedCity':
            const selectedCity = state.cities.filter(item => item.id === action?.row?.id)
            return {...state, selectedCity}


        case 'SETSelectedTown':
            const selectedTown = state.towns[`parent${action?.row?.parent}`].filter(item => item.id === action?.row?.id)
            return {...state, selectedTown}


        case 'SETSelectedRegion':
            const selectedRegion = state.regions[`parent${action?.row?.parent}`].filter(item => item.id === action?.row?.id)
            return {...state, selectedRegion}


        case 'SET_LOADING':
            return {...state, loading: false}

        case 'UNSET_LOADING':
            return {...state, loading: false}


        default:
            return {...state}
    }
}
export default Address