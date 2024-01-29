import { Col, Modal, Row, Spinner } from "reactstrap"
import LeftSide from "./LeftSide"
import { useEffect } from "react"
import { storeVehicle } from "./store/action"
import DataTableArchive from "../our-componnets/DataTableArchive"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
const Vehicle = (props) => {
    const vehicleStore = useSelector(state => state.Vehicles)
    const { vehicleId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'GET_VEHICLE',
            id: +vehicleId
        })
    }, [vehicleId])

    return (
        <>
            <LeftSide vehicleId={vehicleId} selectedVeh={vehicleStore.selectedVeh} refresh={props.refresh} outPage={props.outPage} />
            {!props.outPage && (
                <Row>
                    <Col sm={"12"}>
                        <Col sm={"12"}>
                            <DataTableArchive title={vehicleStore?.config?.dataTableTitle} data={vehicleStore?.data}
                                columns={vehicleStore?.columns}
                            />
                        </Col>
                    </Col>
                </Row>
            )}
            {vehicleStore.loading ? (
                <Modal isOpen={vehicleStore.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent'>
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : null}
        </>
    )
}

export default Vehicle