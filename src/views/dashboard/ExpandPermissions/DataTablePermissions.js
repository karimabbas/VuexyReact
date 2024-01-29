// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react'

// ** Table Data & Columns
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/components/modal.scss'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import { columns } from './list/index'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  Spinner,
  Table,
  CustomInput,
  CardBody,
  FormGroup,
  Modal
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getData, getExpandPermissions, triggerPermission } from './store/action/index'
const customStyles = {
  cells: {
    style: {
      paddingTop: '1rem!important',
      // overflow: 'hidden !important',
      fontSize: '14px!important',
      height: 'fill-available !important',
      paddingBottom: '0.5rem!important'
    }
  },
  rows: {
    style: {
      alignItems: 'center'
    }
  },
  headCells: {
    style: {
      fontSize: '16px'
    }
  }
}
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm, searchValueRef }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <Label for='rows-per-page'>اظهر</Label>
            <CustomInput
              className='form-control mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='all'>الكل</option>
            </CustomInput>
            <Label for='rows-per-page'>صفوف</Label>
          </div>
        </Col>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
          <Label className='mr-1' for='search-input'>
            ابحث:
          </Label>
          <Input
            className='dataTable-filter mb-50'
            type='text'
            bsSize='sm'
            id='search-input'
            innerRef={searchValueRef}
            value={searchTerm}
            onChange={handleFilter}
          />
        </Col>
      </Row>
    </div>
  )
}
const initialState = {
  currentPage: 1,
  searchValue: '',
  rowsPerPage: 10,
  title: '',
  filteredData: [],
  loading: true
}
const DataTablePermissions = (props) => {
  // ** States
  const [tableConfig, setTableConfig] = useState(initialState)
  const [currentFilter, setCurrentFilter] = useState({ label: 'الكل', value: '' })
  const searchValueRef = useRef()
  const dispatch = useDispatch()
  const expandPermissions = useSelector(state => state.expandPermissions)

  const handleFilterCustom = value => {
    let updatedData = []
    setTableConfig(prev => {
      return { ...prev, searchValue: value, currentPage: 1 }
    })

    updatedData = expandPermissions?.filteredData?.filter(item => {
      let startsWith = false
      let includes = false
      Object.keys(item).map(key => {
        try {
          const element = item[key]
          if (element) {
            if (!startsWith) startsWith = element.toString().toLowerCase().startsWith(value.toString().toLowerCase())
            if (!includes) includes = element.toString().toLowerCase().includes(value.toString().toLowerCase())
          }
        } catch (error) {
          console.log(error)
        }
      })
      if (startsWith) {
        return startsWith
      } else if (!startsWith && includes) {
        return includes
      } else return null
    })
    setTableConfig(prev => {
      return { ...prev, searchValue: value, filteredData: updatedData }
    })
  }
  useEffect(() => {
    const search_value = searchValueRef?.current?.value
    setTableConfig(prev => {
      return { ...prev, loading: false, filteredData: expandPermissions?.filteredData, searchValue: search_value }
    })
    handleFilterCustom(search_value)
  }, [expandPermissions?.filteredData])

  useEffect(() => {
    dispatch(getExpandPermissions())
  }, [])
  // useEffect(() => {
  //   dispatch(getData(currentFilter))
  // }, [currentFilter])
  // ** Function to handle filter

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setTableConfig(prev => {
      return { ...prev, searchValue: value, currentPage: 1 }
    })

    updatedData = expandPermissions?.filteredData?.filter(item => {
      let startsWith = false
      let includes = false
      Object.keys(item).map(key => {
        try {
          const element = item[key]
          if (element) {
            if (!startsWith) startsWith = element.toString().toLowerCase().startsWith(value.toString().toLowerCase())
            if (!includes) includes = element.toString().toLowerCase().includes(value.toString().toLowerCase())
          }
        } catch (error) {
          console.log(error)
        }
      })
      if (startsWith) {
        return startsWith
      } else if (!startsWith && includes) {
        return includes
      } else return null
    })
    setTableConfig(prev => {
      return { ...prev, searchValue: value, filteredData: updatedData }
    })
  }

  const paginateArray = (array) => {
    return array?.slice(
      (tableConfig?.currentPage - 1) * tableConfig?.rowsPerPage, tableConfig?.currentPage * tableConfig?.rowsPerPage
    )
  }
  const dataToRender = () => {
    if (tableConfig?.filteredData?.length === 0) {
      return []
    } else if (tableConfig?.searchValue !== '') {
      if (tableConfig?.rowsPerPage === 'all') {
        return tableConfig?.filteredData
      }
      return paginateArray(tableConfig?.filteredData)
    } else {
      if (tableConfig?.rowsPerPage === 'all') {
        return tableConfig?.filteredData
      }
      return paginateArray(tableConfig?.filteredData)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setTableConfig(prev => {
      return { ...prev, currentPage: page.selected + 1 }
    })
  }
  const handlePerPage = e => {
    const page = (e.target.value)
    setTableConfig(prev => {
      return { ...prev, rowsPerPage: page }
    })
  }
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = tableConfig?.searchValue === '' ? (
      Math.ceil(tableConfig?.filteredData.length / tableConfig?.rowsPerPage)
    ) : (
      Math.ceil(tableConfig?.filteredData.length / tableConfig?.rowsPerPage)
    )
    return (
      <ReactPaginate
        previousLabel=''
        nextLabel=''
        forcePage={tableConfig?.currentPage !== 0 ? tableConfig?.currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        // pageCount={ searchValue.length ? filteredData.length / rowsPerPage : data.length / rowsPerPage || 1 }
        pageCount={count || 1}
        breakLabel='...'
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName='active'
        pageClassName='page-item'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        nextLinkClassName='page-link'
        nextClassName='page-item next'
        previousClassName='page-item prev'
        previousLinkClassName='page-link'
        pageLinkClassName='page-link'
        containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
      />
    )
  }
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV (array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV (array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  const handleSwitch = permission => {
    dispatch(triggerPermission(permission, currentFilter))
  }
  const customSort = (rows, selector, direction) => {
    const arrayFilter = tableConfig?.searchValue !== '' ? tableConfig?.filteredData : expandPermissions?.filteredData
    return arrayFilter.sort((a, b) => {
      let aField = selector(a)
      let bField = selector(b)

      if (!isNaN(a)) {
        aField = selector(a).toLowerCase()
        bField = selector(b).toLowerCase()
      }
      let comparison = 0

      if (aField > bField) {
        comparison = 1
      } else if (aField < bField) {
        comparison = -1
      }

      return direction === 'desc' ? comparison * -1 : comparison
    }).slice((tableConfig?.currentPage - 1) * tableConfig?.rowsPerPage, tableConfig?.currentPage * tableConfig?.rowsPerPage)
  }
  return (
    <Fragment>
      {expandPermissions.loading ? (
        <Modal isOpen={expandPermissions.loading} className='modal-dialog-centered custom-spinner-modal'>
          <div className='w-100 h-100 p-0 m-0 b-transparent' >
            <Spinner color='primary custom-spinner-loading' />
          </div>
        </Modal>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>صلاحيات اكسباند</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <FormGroup>
                <Label for='perm'>فلترة الصلاحيات</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  id='perm'
                  className='react-select'
                  classNamePrefix='select'
                  options={[{ label: 'الكل', value: '' }, ...expandPermissions?.headers ?? []]}
                  value={currentFilter}
                  onChange={data => {
                    setCurrentFilter(data)
                    dispatch(getData(data))
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>{tableConfig?.title}</CardTitle>
          <UncontrolledButtonDropdown>
            <DropdownToggle color='secondary' caret outline>
              <Share size={15} />
              <span className='align-middle ml-50'>تصدير الى</span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className='w-100'>
                <Printer size={15} />
                <span className='align-middle ml-50'>Print</span>
              </DropdownItem>
              <DropdownItem className='w-100' onClick={() => downloadCSV(tableConfig?.filteredData)}>
                <FileText size={15} />
                <span className='align-middle ml-50'>CSV</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <Grid size={15} />
                <span className='align-middle ml-50'>Excel</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <File size={15} />
                <span className='align-middle ml-50'>PDF</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <Copy size={15} />
                <span className='align-middle ml-50'>Copy</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>
        <DataTable
          noHeader
          pagination
          paginationServer
          // sortFunction={ customSort }
          subHeader={true}
          columns={columns(handleSwitch)}
          paginationPerPage={tableConfig?.rowsPerPage}
          customStyles={customStyles}
          className='react-dataTable'
          subHeaderComponent={
            <CustomHeader
              handlePerPage={handlePerPage}
              rowsPerPage={tableConfig?.rowsPerPage}
              searchTerm={tableConfig?.searchValue}
              handleFilter={handleFilter}
              searchValueRef={searchValueRef}
            />
          }
          progressPending={tableConfig?.loading}
          progressComponent={
            <Table responsive className='custom-responsive-table' style={{ fontSize: '16px!important' }}>
              <thead>
                <tr>
                  <td className=''>
                    الصلاحية
                  </td>
                  <td className=''>
                    الحالة
                  </td>
                </tr>
              </thead>
              <tbody className='custom-table-body'>
                <tr>
                  <td className='text-center pt-2' colSpan='10'>
                    <Spinner color='primary' className='my-1' />
                  </td>
                </tr>
              </tbody>
            </Table>
          }
          noDataComponent={
            <Table responsive className='custom-responsive-table' style={{ fontSize: '16px!important' }}>
              <tbody className='custom-table-body'>
                <tr>
                  <td className='text-center pt-2' colSpan='10'>
                    {tableConfig?.loading ? (
                      <Spinner color='primary' className='my-1' />
                    ) : (
                      <p className='mb-0 pt-1'>لا يوجد بيانات في الجدول</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          }
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={tableConfig?.currentPage + 1}
          paginationComponent={CustomPagination}
          data={dataToRender()}
        />
      </Card>
    </Fragment>
  )
}

export default DataTablePermissions
