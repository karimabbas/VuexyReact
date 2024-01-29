import api from "../../../@core/util/api"
import { ErrorToast, SuccessToast } from '@components/toast'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { InstitutionsAndOfficesColumns } from '../InstitutionsAndOffices/data'
import { projectColumns } from '../projects/data'
import { AssetsColumns } from '../BuilidingAndWarehouse/data'
import { getConfig } from '../config/index'
import { EmployeeColumns } from "../employee/data"
import { CitizenColumns } from "../citizen/data"

export const storeDef = (def, data) => async (dispatch) => {
    let url = ''
    if (def === 'show_employee') {
        url = 'storeEmployee'
    } else if (def === 'show_citizens') {
        url = 'storeCitizen'
    } else if (def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') {
        url = 'storeOrginzation'
    } else if (def === 'projects') {
        url = 'storeProject'
    } else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'show_gardens_lands') {
        url = 'storeAssets'
    } else if (def === 'show_customer') {
        url = 'storeCustomer'
    }
    let state
    api().post(url, data)
        .then((response) => {
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false })
            // console.log(response.data)
            dispatch({
                type: 'ADD_DEFINITION',
                item: response.data.data
            })
            state = true
        }).catch((err) => {
            toast.error(
                <ErrorToast
                    title={<h3>خطأ!</h3>}
                    result={
                        err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
                    }
                />, { hideProgressBar: false })
            state = false
        })
    return state
}

export const getAllDefData = (def, handleDeleteDefintion) => {
    let defColumnsData = []
    let url = ''
    const config = getConfig(def)

    if (def === 'projects') {
        defColumnsData = projectColumns(def, handleDeleteDefintion)
        url = 'project_info_all'
    } else if (def === 'show_employee') {
        defColumnsData = EmployeeColumns(def, handleDeleteDefintion)
        url = 'emp_info_all'
    } else if (def === 'show_customer') {
        defColumnsData = CitizenColumns(def, handleDeleteDefintion)
        url = 'allCustomer'
    } else if (def === 'warehouse' || def === 'building' || def === 'lands&gardens') {
        defColumnsData = AssetsColumns(def, handleDeleteDefintion)
        url = 'asset_info_all'
    } else {
        defColumnsData = InstitutionsAndOfficesColumns(def, handleDeleteDefintion)
        url = 'orgnization_info_all'
    }
    config.handleDeleteDefintion = handleDeleteDefintion

    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().post(url, { type: config.TypeApi }).then(response => {
            dispatch({
                type: 'GET_ALL_DATA',
                data: response.data,
                columns: defColumnsData,
                config
            })
            dispatch({
                type: 'UNSET_LOADING'
            })
        })
    }
}

export const getDefinition = (data) => {
    // return async dispatch => {
    //     const url = 'getOrg_info'
    //     await api().post(url, { id })
    //         .then(response => {
    //             console.log(response?.data?.user)
    //             dispatch({
    //                 type: 'GET_DEF',
    //                 selectedDef: response?.data?.user
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }
    return async dispatch => {
        dispatch({
            type: 'GET_DEF',
            selectedDef:  data.id
        })
    }
}

export const setLoading = () => {
    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
    }
}
export const unSetLoading = () => {
    return async dispatch => {
        dispatch({
            type: 'UNSET_LOADING'
        })
    }
}
export const deleteDefinition = (def, id) => async (dispatch) => {
    let url = ''
    if (def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') url = 'org_delete'
    else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'lands&show_gardens_lands') url = 'building_delete'
    else if (def === 'projects') url = 'proj_delete'
    // console.log(def, url)
    api().post(url, id).then(res => {
        if (res.status === 200) {
            if (res.data.status) {
                toast.success(
                    <SuccessToast
                        result={<h6>{res.data.message} !</h6>}
                    />, { hideProgressBar: false })
                dispatch({
                    type: 'DELETE',
                    id
                })
            } else {
                toast.error(
                    <ErrorToast
                        title={<h3>خطأ!</h3>}
                        result={<h6>{res.data.message} !</h6>}

                    />, { hideProgressBar: false })
                return 'error'
            }
        }
    })
}
