import {Fragment, useEffect, useState, useRef} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    ListGroup,
    ListGroupItem,
    TabContent,
    TabPane, CardText, Row, Input, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import api from "../../@core/util/api"
import classnames from 'classnames'
import {Archive, ChevronDown, Edit, Edit2, FileText, MoreVertical, Trash} from "react-feather"
import {toast} from "react-toastify"
import {ErrorToast, SuccessToast} from "../../@core/components/toast"
import {basicColumns, data, multiLingColumns} from "../tables/data-tables/data"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import {FormattedMessage} from "react-intl"

const ExtensionModel = (props) => {
    const [modal, setModal] = useState(555)
    const [firstTime, setFirstTime] = useState(true)
    const [extensionList, setExtensionList] = useState([])
    const [extensionName, setExtensionName] = useState('')
    const [extensionId, setExtensionId] = useState(0)
    const [submitText, setSubmitText] = useState('حفظ')
    const [currentPage, setCurrentPage] = useState(0)
    const [newItemAdded, setNewItemAdded] = useState(false)

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

    // useEffect(() => {
    //     if (props.modelId !== null && props.modelId !== 0) {
    //         api().get(props.apiUrl).then(response => {
    //             setExtensionList([...response.data])
    //         })
    //     }
    // }, [props.apiUrl, newItemAdded])

    useEffect(() => {
        if (!firstTime) {
            toggleModal(props.modelId)
        }
    }, [props.show])

    useEffect(() => {
        setFirstTime(false)
    }, [])

    useEffect(() => {
        setExtensionList(props.data)
    }, [props.data])

    const edit = (item) => {
        setExtensionName(item.name)
        setExtensionId(item.id)
        setSubmitText('تعديل')
    }

    const callApi = (url, data) => {
        api().post(url, data)
            .then((response) => {
                toast.success(
                    <SuccessToast
                        result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                    />, {hideProgressBar: false})
                setNewItemAdded((prevState) => !prevState)
                props.notifySelect((prevState) => !prevState)
                setExtensionName('')
                setExtensionId(0)
                setSubmitText('حفظ')
                setCurrentPage(0)
                toggleModal(props.modelId)
            }).catch((err) => {
            toast.error(
                <ErrorToast
                    title={<h3>خطأ!</h3>}
                    result={
                        err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
                    }
                />, {hideProgressBar: false})
        })
    }

    const submitHandler = () => {
        const url = props.storeUrl
        const parent = props.modelId
        const data = {
            extensionId,
            extensionName,
            parent
        }
        if (props.parent !== null && props.parent !== 0) {
            callApi(url, data)
        }
    }

    const deleteHandler = (id) => {
        const url = props.deleteUrl
        const data = {
            id
        }
        if (parent !== null && parent !== 0) {
            callApi(url, data)
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
        <div className='demo-inline-spacing'><Fragment key={props.modelId ?? 555}>
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
                                columns={[
                                    {
                                        name: '#',
                                        selector: 'rowId',
                                        sortable: true,
                                        minWidth: '10px'
                                    },
                                    {
                                        name: 'الاسم',
                                        selector: 'name',
                                        sortable: true,
                                        minWidth: '170px'
                                    },
                                    {
                                        allowOverflow: true,
                                        cell: row => {
                                            return (
                                                <div className='d-flex'>
                                                    <Button.Ripple className='btn-icon rounded-circle'
                                                                   color='flat-success' onClick={() => {
                                                        edit(row)
                                                    }}>
                                                        <Edit2 className='headings' size={16}/>
                                                    </Button.Ripple>
                                                    <Button.Ripple className='btn-icon rounded-circle'
                                                                   color='flat-success'
                                                                   onClick={() => deleteHandler(row.id)}>
                                                        <Trash className='headings' size={16}/>
                                                    </Button.Ripple>
                                                </div>
                                            )
                                        }
                                    }

                                ]}
                                className='react-dataTable'
                                paginationPerPage={7}
                                sortIcon={<ChevronDown size={10}/>}
                                paginationDefaultPage={currentPage + 1}
                                paginationComponent={CustomPagination}
                                data={extensionList}

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
                                <Button color='primary' onClick={() => submitHandler()} outline>
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
