import { Col, Row, Modal, Spinner } from "reactstrap"
import { useParams, useHistory } from "react-router-dom"
import ReportsForm from "./ReportsForm"
import { useDispatch, useSelector } from 'react-redux'
import DataTable from "./DataTable"
import { getData, handleRestoreDef, resetReportDataTable, restorArchive, restoredef, setLoading, unSetLoading } from "./action"
import { useState, useEffect } from 'react'
import '@styles/base/components/modal.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Reports = () => {

    const { def } = useParams()
    const history = useHistory()
    const [isSubmitted, setIsSubmitted] = useState(false)


    const dispatch = useDispatch()

    const Reports = useSelector(state => state.Reports)

    // const refresh = () => {
    //     history.push(`/Reports/${def}`)
    //     setIsSubmitted(prev => !prev)

    // }

    useEffect(() => {
        // refresh()
        dispatch(resetReportDataTable())
    }, [def])

    const handleRestoreArchive = async (id) => {
        dispatch(restorArchive(id))
    }
    const handleRestoreDef = async (type, id) => {
        dispatch(restoredef(type, id))
    }

    const submitHandler = (data) => {
        // console.log(data)
        const customerid = data.customer.id
        const customerType = data.customer.model
        const name = data.customer.value
        const orgType = data.doc
        dispatch(getData(def, { from: data.picker, to: data.picker1, search_type: data.search_type, arcType: data.selected, customerid, customerType, name, orgType }, handleRestoreArchive, handleRestoreDef))
        // refresh()
     
    }
    return (
        <>
            {Reports.loading ? (
                <Modal isOpen={Reports.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent' >
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : null}
            <ReportsForm isSubmitted={isSubmitted} onsubmit={submitHandler} type={def} />
            <Row>
                <Col sm={"12"}>
                    <DataTable
                        title={Reports?.config?.dataTableTitle}
                        data={Reports?.data}
                        columns={Reports?.columns} />
                </Col>
            </Row>
        </>
    )
}

export default Reports