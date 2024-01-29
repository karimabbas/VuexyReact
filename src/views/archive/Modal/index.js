import { useState, useEffect } from 'react'
import { Col, Row, Modal, Spinner } from "reactstrap"
import Address from "../../our-componnets/Address"
import { useHistory, useParams } from "react-router-dom"
import api from "../../../@core/util/api"
import { toast, Slide } from 'react-toastify'
import { ErrorToast, SuccessToast } from '@components/toast'
import DataTableArchive from '../../our-componnets/DataTableArchive'
import { getDef, getConfig } from '../../definitions/config'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@styles/base/components/modal.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDefData, getDefinition, storeDef } from '../../definitions/action/index'
import { get_All_Orginzation_Data, store_Orginzation, deleteDefinition, setrefresh } from '../../definitions/InstitutionsAndOffices/store/action'
import { deleteAssets, get_All_Assets_Data, store_Assets } from '../../definitions/BuilidingAndWarehouse/store/action'
import { deleteProject, get_All_Projects_Data, store_Projects } from '../../definitions/projects/store/action'
import { deleteCitizen, get_All_Citizen_Data, store_subscriber } from '../../definitions/citizen/store/action'
import { deleteEmployee, get_All_Emp_Data, store_Employee } from "../../definitions/employee/store/action"
import { deleteCustomer, get_All_Customer_Data, store_Customer } from "../../definitions/customer/store/action"


const citizen = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [defStore, setDefStore] = useState({})
    const history = useHistory()
    // const { def, defId } = useParams()
    const dispatch = useDispatch()
    const def = props?.def
    const defId = null
    const orginzations = useSelector(state => state.Orginzations)
    const assets = useSelector(state => state.ASSETS)
    const projects = useSelector(state => state.PROJECTS)
    const Citizens = useSelector(state => state.Citizens)
    const employeeStore = useSelector(state => state.Employees)
    const customerStore = useSelector(state => state.Customers)

    const refresh = () => {
        // history.push(`/add&edit/${def}`)
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
            return dispatch(get_All_Orginzation_Data(def, handleDeleteDefintion))
        } else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'show_gardens_lands') {
            return dispatch(get_All_Assets_Data(def, handleDeleteDefintion))
        } else if (def === 'show_projects') {
            return dispatch(get_All_Projects_Data(def, handleDeleteDefintion))
        } else if (def === 'show_employee') {
            return dispatch(get_All_Emp_Data(def, handleDeleteDefintion))
        } else if (def === 'show_citizens') {
            return dispatch(get_All_Citizen_Data(def, handleDeleteDefintion))
        } else if (def === 'show_customer') {
            return dispatch(get_All_Customer_Data(def, handleDeleteDefintion))
        }
    }
    useEffect(() => {
        Handel_DataTable(def)
    }, [def])

    useEffect(() => {
        if (def) {

            if (def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') {
                setDefStore(orginzations)
            } else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'show_gardens_lands') {
                setDefStore(assets)
            } else if (def === 'show_projects') {
                setDefStore(projects)
            } else if (def === 'show_citizens') {
                setDefStore(Citizens)
            } else if (def === 'show_employee') {
                setDefStore(employeeStore)
            } else if (def === 'show_customer') {
                setDefStore(customerStore)
            }
        }
    }, [orginzations, assets, projects, Citizens, employeeStore, customerStore])

    useEffect(() => {
        dispatch({
            type: 'GET_DEF',
            id: +defId
        })

    }, [defId])

    useEffect(() => {
        if ((def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') && orginzations.handle_refresh) {
            refresh()
            dispatch({
                type: 'SET_REFRESH',
                value: false
            })

        } else if (def === 'show_citizens' && Citizens.handle_refresh) {
            refresh()
            dispatch({
                type: 'SET_CITIZEN_REFRESH',
                value: false
            })
        } else if (def === 'show_employee' && employeeStore.handle_refresh) {
            refresh()
            dispatch({
                type: 'SET_Emp_REFRESH',
                value: false
            })
        } else if (def === 'show_customer' && customerStore.handle_refresh) {
            refresh()
            dispatch({
                type: 'SET_Customer_REFRESH',
                value: false
            })
        }

    }, [orginzations?.handle_refresh, assets?.handle_refresh, projects?.handle_refresh, employeeStore.handle_refresh, Citizens?.handle_refresh, customerStore.handle_refresh])


    const submitHandler = async (data) => {

        if (def === 'show_orginzation' || def === 'show_enginering' || def === 'show_space' || def === 'show_suppliers' || def === 'show_banks') {
            dispatch(store_Orginzation(def, data))
        } else if (def === 'show_warehouses' || def === 'show_buildings' || def === 'show_gardens_lands') {
            dispatch(store_Assets(def, data))
        } else if (def === 'show_employee') {
            dispatch(store_Employee(def, data))

        } else if (def === 'show_citizens') {
            dispatch(store_subscriber(data))

        } else if (def === 'show_projects') {
            dispatch(store_Projects(def, data))

        } else if (def === 'show_customer') {
            dispatch(store_Customer(def, data))
        }
        setTimeout(() => {
            props.refresh()
        }, 2000)
        refresh()
    }
    return (
        <>
            <Address isSubmitted={isSubmitted} onsubmit={submitHandler} selectedDef={defStore.selectedDef} outPage={true}
                allow_list={defStore?.employees} defStore={defStore}
                refresh={refresh} id={defId} type={def} />
            {/* <Row>
                <Col sm={"12"}>
                    <DataTableArchive type={def} title={defStore?.config?.dataTableTitle} data={defStore?.data}
                        columns={defStore?.columns}
                    />
                </Col>
            </Row> */}
            {/* {defStore.loading ? (
                <Modal isOpen={defStore.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent'>
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : null} */}
        </>
    )
}

export default citizen