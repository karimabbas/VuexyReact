import {Fragment, useEffect, useState, useRef} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col, Row, Input
} from 'reactstrap'
import {ChevronDown} from "react-feather"
import {toast} from "react-toastify"
import {ErrorToast, SuccessToast} from "../../../@core/components/toast"
// import {basicColumns, data, multiLingColumns} from "../tables/data-tables/data"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import {FormattedMessage} from "react-intl"
import {useDispatch, useSelector} from "react-redux"
import {storeConstant} from "./Constants/action"
import {storeAddress} from "./Address/action"

const ExtensionModel = (props) => {
    const [modal, setModal] = useState(555)
    const [firstTime, setFirstTime] = useState(true)
    const [extensionList, setExtensionList] = useState([])
    const [extensionName, setExtensionName] = useState('')
    const [extensionId, setExtensionId] = useState(0)
    const [submitText, setSubmitText] = useState('حفظ')
    const [currentPage, setCurrentPage] = useState(0)
    const [newItemAdded, setNewItemAdded] = useState(false)

    const dispatch = useDispatch()

    let ConstantStore, AddressStore
    let column
    if (props.type !== 'city' && props.type !== 'town' && props.type !== 'region') {
        ConstantStore = useSelector(state => state.Constants)
        column = ConstantStore.columns
    } else {
        AddressStore = useSelector(state => state.Address)
        if (props.type === 'city') {
            column = AddressStore.cityColumn ?? []
        } else if (props.type === 'town') {
            column = AddressStore.townColumn ?? []
        } else if (props.type === 'region') {
            column = AddressStore.regionColumn ?? []
        }
    }

    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    const toggleModal = id => {
        if (modal !== id) {
            setModal(id)
        } else {
            setModal(555)
        }
        setExtensionName('')
        setExtensionId(0)
        setSubmitText('حفظ')
        setCurrentPage(0)
    }

    useEffect(() => {
        let selectList
        if (props.modelId !== 0 && props.modelId !== null) {
            if (props.type === 'city') {
                selectList = [...AddressStore.cities ?? []]
            } else if (props.type === 'town') {
                selectList = [...AddressStore.towns[`parent${props.modelId}`] ?? []]
            } else if (props.type === 'region') {
                selectList = [...AddressStore.regions[`parent${props.modelId}`] ?? []]
            } else {
                selectList = [...ConstantStore.data[`parent${props.modelId}`] ?? []]
            }
        }
        setExtensionList(selectList)
        props.notifySelect((prevState) => !prevState)
    }, [ConstantStore, AddressStore, props.modelId])

    useEffect(() => {
        if (!firstTime) {
            toggleModal(props.modelId)
        } else {
            setFirstTime(false)
        }
    }, [props.show])

    useEffect(() => {
        if (ConstantStore?.selected[0]?.parent === props.modelId) {
            setExtensionName(ConstantStore?.selected[0]?.name ?? '')
            setExtensionId(ConstantStore?.selected[0]?.id ?? 0)
            setSubmitText('تعديل')
        } else {
            setExtensionName('')
            setExtensionId(0)
            setSubmitText('حفظ')
        }
    }, [ConstantStore?.selected])

    useEffect(() => {
        if (AddressStore?.selectedCity[0] !== null && AddressStore?.selectedCity[0] !== undefined && props.type === 'city') {
            setExtensionName(AddressStore?.selectedCity[0]?.name ?? '')
            setExtensionId(AddressStore?.selectedCity[0]?.id ?? 0)
            setSubmitText('تعديل')
        } else if (AddressStore?.selectedTown[0]?.parent === props.modelId) {
            setExtensionName(AddressStore?.selectedTown[0]?.name ?? '')
            setExtensionId(AddressStore?.selectedTown[0]?.id ?? 0)
            setSubmitText('تعديل')
        } else if (AddressStore?.selectedRegion[0]?.parent === props.modelId) {
            setExtensionName(AddressStore?.selectedRegion[0]?.name ?? '')
            setExtensionId(AddressStore?.selectedRegion[0]?.id ?? 0)
            setSubmitText('تعديل')
        } else {
            setExtensionName('')
            setExtensionId(0)
            setSubmitText('حفظ')
        }
    }, [AddressStore?.selectedCity, AddressStore?.selectedTown, AddressStore?.selectedRegion])

    const submitHandler = async () => {
        const parent = props.modelId
        const data = {
            extensionId,
            extensionName,
            parent
        }
        let state = false
        if (props.type === 'city' || props.type === 'town' || props.type === 'region') {
            state = dispatch(storeAddress(data, props.type))
        } else {
            if (props.parent !== null && props.parent !== 0) {
                // callApi(url, data)
                state = dispatch(storeConstant(data))
            }
        }
        if (state) {
            toggleModal(0)
        }
    }

    // ** Pagination Previous Component
    const Previous = () => {
        return (
            <Fragment>
        <span className='align-middle d-none d-md-inline-block'>
          <FormattedMessage id='Prev'/>
        </span>
            </Fragment>
        )
    }

    // ** Pagination Next Component
    const Next = () => {
        return (
            <Fragment>
        <span className='align-middle d-none d-md-inline-block'>
          <FormattedMessage id='Next'/>
        </span>
            </Fragment>
        )
    }

    const CustomPagination = () => (
        <ReactPaginate
            previousLabel={<Previous size={15}/>}
            nextLabel={<Next size={15}/>}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={extensionList.length ? extensionList.length / 7 : extensionList.length / 7 || 1}
            breakLabel={'...'}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName={'active'}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName={'pagination react-paginate pagination-sm justify-content-end pr-1 mt-1'}
        />
    )

    return (
        <div className='demo-inline-spacing'>
            <Fragment key={props.modelId ?? 555}>
                <Modal
                    isOpen={modal === props.modelId ?? 555}
                    toggle={() => toggleModal(props.modelId ?? 555)}
                    className={`modal-dialog-centered modal-sm`}
                    key={props.modelId}
                >
                    <ModalHeader toggle={() => toggleModal(props.modelId ?? 555)}>
                        {props.title}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md='12' sm='12'>
                                <DataTable
                                    noHeader
                                    pagination
                                    selectableRowsNoSelectAll
                                    columns={column}
                                    className='react-dataTable'
                                    paginationPerPage={7}
                                    sortIcon={<ChevronDown size={10}/>}
                                    paginationDefaultPage={currentPage + 1}
                                    paginationComponent={CustomPagination}
                                    data={extensionList}
                                    noDataComponent={'لا يوجد بيانات !' }
                                    // noOptionsMessage={ () => 'لا يوجد بيانات !' }

                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Row>
                            <Col md='12' sm='12'>
                                <Input
                                    id='name'
                                    name='name'
                                    value={extensionName}
                                    onChange={(e) => {
                                        setExtensionName(e.currentTarget.value)
                                    }}
                                />
                                <Input
                                    id='id'
                                    name='id'
                                    value={extensionId}
                                    type={'hidden'}
                                />
                            </Col>
                            <Col md='12' sm='12' className={'mt-1'}>
                                <center>
                                    <Button color='primary' type={'button'} onClick={() => submitHandler()} outline>
                                        {submitText}
                                    </Button>
                                </center>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </Fragment>
        </div>
    )
}
export default ExtensionModel
