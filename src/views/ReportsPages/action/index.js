import { DeleteTariffs } from "../column/DeleteTariffs"
import api from "../../../@core/util/api"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ErrorToast, SuccessToast } from '@components/toast'
import { toast } from 'react-toastify'
import { DeletedArchive } from "../column/DeletedArchive"
import { DailyReport } from "../column/DailyReport"
import { CentralArchive } from "../column/CentralArchive"
const getConfig = (type) => {
    const config = {
        TypeApi: '',
        dataTableTitle: 'نتائج البحث'
    }
    if (type === 'CentralArchive' || type === 'DailyArchive' || type === 'RemoveArchive' || type === 'DeleteTariffs') return config
}

export const getData = (def, data, handleRestoreArchive, handleRestoreDef) => {
    let ColumnsData = []
    let url = ''
    const config = getConfig(def)

    if (def === 'DeletedDef') {
        ColumnsData = DeleteTariffs(def, handleRestoreDef)
        url = 'deletedDefinitions'

    } else if (def === 'DeletedArchive') {
        ColumnsData = DeletedArchive(def, handleRestoreArchive)
        url = 'deletedArchive'

    } else if (def === 'DailyReport') {
        ColumnsData = DailyReport(def, data?.search_type)
        url = 'allArchive'

    } else if (def === 'CentralArchive') {
        ColumnsData = CentralArchive(def, data)
        url = 'archieve_report'
    }
    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })

        await api().post(url, data).then(response => {
            dispatch({
                type: 'GET_ALL_DATA',
                data: response.data,
                columns: ColumnsData,
                config
            })
            dispatch({
                type: 'UNSET_LOADING'
            })
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

export const resetReportDataTable = () => {
    return async dispatch => {
        dispatch({
            type: 'RESET'
        })
    }
}

export const restoredef = (type, id) => async (dispatch) => {
    let url = ''
    // const id = ''
    if (type === 'employee') url = 'restoreUser'
    else if (type === 'department') url = 'restoreDepartment'
    else if (type === 'customers') url = 'restoreCustomer'
    else if (type === 'subscribers') url = 'restoreCitizen'
    else if (type === 'orginzation' || type === 'suppliers' || type === 'banks' || type === 'enginering' || type === 'space') url = 'restoreOrgnization'
    else if (type === 'dev_equp') url = 'restoreEqupment'
    else if (type === 'vehicles')  url = 'restoreVehicle'
    else if (type === 'buildings' || type === 'warehouses' || type === 'Gardens_lands') url = 'restoreSpecialAsset'
    else if (type === 'projects') url = 'restoreProject'
    else if (type === 'sparePart') url = 'restoreSparepart'

    const MySwal = withReactContent(Swal)

    api().post(url, id).then(res => {
        console.log(id)
        if (res.status === 200) {
            dispatch({
                type: 'RESTORE',
                id
            })
            return MySwal.fire({
                icon: 'success',
                title: 'تم !',
                text: 'تمت الاستعادة',
                customClass: {
                    confirmButton: 'btn btn-success'
                }
            })
        } else {
            return MySwal.fire({
                icon: 'warning',
                title: 'خطأ !',
                text: 'خطأ',
                customClass: {
                    confirmButton: 'btn btn-danger'
                }
            })
        }
    })
}

export const restorArchive = (id) => async (dispatch) => {

    const MySwal = withReactContent(Swal)

    api().post('restore_Archive', id).then(res => {
        // console.log(id)
        if (res.status === 200) {
            dispatch({
                type: 'RESTORE',
                id
            })
            return MySwal.fire({
                icon: 'success',
                title: 'تم !',
                text: 'تمت الاستعادة',
                customClass: {
                    confirmButton: 'btn btn-success'
                }
            })
        } else {
            return MySwal.fire({
                icon: 'warning',
                title: 'خطأ !',
                text: 'خطأ',
                customClass: {
                    confirmButton: 'btn btn-danger'
                }
            })
        }
    })
}

