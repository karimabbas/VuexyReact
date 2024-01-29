import { useState, useEffect } from 'react'
import { Col, Row, Modal, Spinner } from "reactstrap"
import Address from "../our-componnets/Address"
import { useHistory, useParams } from "react-router-dom"
import api from "../../@core/util/api"
import { toast, Slide } from 'react-toastify'
import { ErrorToast, SuccessToast } from '@components/toast'
import DataTableArchive from '../our-componnets/DataTableArchive'
import { getDef, getConfig } from './config'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@styles/base/components/modal.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDefData, getDefinition, storeDef } from './action/index'
import { get_All_Orginzation_Data, store_Orginzation, deleteDefinition, setrefresh } from './InstitutionsAndOffices/store/action'
import { deleteAssets, get_All_Assets_Data, store_Assets } from './BuilidingAndWarehouse/store/action'
import { deleteProject, get_All_Projects_Data, store_Projects } from './projects/store/action'
import { deleteCitizen, get_All_Citizen_Data, store_subscriber } from './citizen/store/action'
import { deleteEmployee, get_All_Emp_Data, store_Employee } from "./employee/store/action"
import { deleteCustomer, get_All_Customer_Data, store_Customer } from "./customer/store/action"


const citizen = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    // const [defStore, setDefStore] = useState({})
    const history = useHistory()
    const { def, defId } = useParams()
    const dispatch = useDispatch()

    let defStore = {}

    if (def) {

        if (def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') {
            defStore = useSelector(state => state.Orginzations)
        } else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'show_gardens_lands') {
            defStore = useSelector(state => state.ASSETS)
        } else if (def === 'show_projects') {
            defStore = useSelector(state => state.PROJECTS)
        } else if (def === 'show_citizens') {
            defStore = useSelector(state => state.Citizens)
        } else if (def === 'show_employee') {
            defStore = useSelector(state => state.Employees)
        } else if (def === 'show_customer') {
            defStore = useSelector(state => state.Customers)
        }
    }

    const refresh = () => {
        history.push(`/add&edit/${def}`)
        setIsSubmitted(prev => !prev)
    }

    const handleDeleteDefintion = async (def, id) => {
        const MySwal = withReactContent(Swal)
        return MySwal.fire({
            title: 'هل أنت متأكد من الحذف ؟',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'نعم !',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                console.log(def, id)
                if (def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') {
                    dispatch(deleteDefinition(id))
                } else if (def === 'show_employee') {
                    dispatch(deleteEmployee(def, id))
                } else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'show_gardens_lands') {
                    dispatch(deleteAssets(id))
                } else if (def === 'show_projects') {
                    dispatch(deleteProject(id))
                } else if (def === 'show_citizens') {
                    dispatch(deleteCitizen(id))
                } else if (def === 'show_customer') {
                    dispatch(deleteCustomer(def, id))
                }
                // MySwal.fire({
                //     icon: 'success',
                //     title: 'تم !',
                //     text: 'تم الحذف',
                //     customClass: {
                //         confirmButton: 'btn btn-success'
                //     }
                // })
            }
        })
    }

    const Handel_DataTable = (def) => {
        if (def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') {
            return dispatch(get_All_Orginzation_Data(def, handleDeleteDefintion, defId))
        } else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'show_gardens_lands') {
            return dispatch(get_All_Assets_Data(def, handleDeleteDefintion, defId))
        } else if (def === 'show_projects') {
            return dispatch(get_All_Projects_Data(def, handleDeleteDefintion, defId))
        } else if (def === 'show_employee') {
            return dispatch(get_All_Emp_Data(def, handleDeleteDefintion, defId))
        } else if (def === 'show_citizens') {
            return dispatch(get_All_Citizen_Data(def, handleDeleteDefintion, defId))
        } else if (def === 'show_customer') {
            return dispatch(get_All_Customer_Data(def, handleDeleteDefintion, defId))
        }
    }
    useEffect(() => {
        Handel_DataTable(def)
    }, [def])

    useEffect(() => {
        dispatch({
            type: 'GET_DEF',
            id: +defId
        })

    }, [defId])

    useEffect(() => {
        if ((def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') && defStore.handle_refresh) {
            refresh()
            dispatch({
                type: 'SET_REFRESH',
                value: false
            })

        } else if (def === 'show_citizens' && defStore.handle_refresh) {
            refresh()
            dispatch({
                type: 'SET_CITIZEN_REFRESH',
                value: false
            })
        } else if (def === 'show_employee' && defStore.handle_refresh) {
            refresh()
            dispatch({
                type: 'SET_Emp_REFRESH',
                value: false
            })
        } else if (def === 'show_customer' && defStore.handle_refresh) {
            refresh()
            dispatch({
                type: 'SET_Customer_REFRESH',
                value: false
            })
        }

    }, [defStore?.handle_refresh])


    const submitHandler = async (data) => {
        if (def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') {
            dispatch(store_Orginzation(def, data))

        } else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'show_gardens_lands') {
            dispatch(store_Assets(def, data))
            refresh()

        } else if (def === 'show_employee') {
            dispatch(store_Employee(def, data))

        } else if (def === 'show_citizens') {
            dispatch(store_subscriber(def, data))

        } else if (def === 'show_projects') {
            dispatch(store_Projects(def, data))
            refresh()

        } else if (def === 'show_customer') {
            dispatch(store_Customer(def, data))
        }

    }
    return (
        <>
            <Address isSubmitted={isSubmitted} onsubmit={submitHandler} selectedDef={defStore.selectedDef} outPage={false}
                allow_list={(def !== 'show_employee' ? defStore?.employees : defStore?.data)} defStore={defStore}
                refresh={refresh} id={defId} type={def} />
            <Row>
                <Col sm={"12"}>
                    <DataTableArchive type={def} title={defStore?.config?.dataTableTitle} data={defStore?.data}
                        columns={defStore?.columns}
                    />
                </Col>
            </Row>
            {defStore.loading ? (
                <Modal isOpen={defStore.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent'>
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : null}
        </>
    )
}

export default citizen