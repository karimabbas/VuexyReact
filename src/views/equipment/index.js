import { Col, Row } from "reactstrap"
import { useParams } from "react-router-dom"
import LeftSide from "./LeftSide"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import DataTableArchive from '../our-componnets/DataTableArchive'
const Equipment = (props) => {

    const EquipmentStore = useSelector(state => state.Equipments)

    const { equipId } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({
            type: 'GET_EQUIPMENT',
            id: +equipId
        })

    }, [equipId])
    return (
        <>
            <LeftSide equipId={equipId} selectedEqu={EquipmentStore.selectedEqu} outPage={props.outPage} refresh={props.refresh} />
            {!props.outPage && <Row>
                <Col sm={"12"}>
                    <DataTableArchive title={EquipmentStore?.config?.dataTableTitle} data={EquipmentStore?.data}
                        columns={EquipmentStore?.columns}
                    />
                </Col>
            </Row>}
            {EquipmentStore.loading ? (
                <Modal isOpen={EquipmentStore.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent'>
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : null}
        </>


    )


}

export default Equipment