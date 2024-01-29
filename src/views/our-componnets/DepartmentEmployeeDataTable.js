// ** React Imports
import { Fragment, useState, forwardRef, useEffect, lazy } from 'react'

// ** Table Data & Columns

import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
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
  CustomInput
} from 'reactstrap'
import api from '../../@core/util/api'
import LoadingSpinner from '@src/@core/components/spinner/Fallback-spinner'
import { handlerArabicSearch } from '@utils'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
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
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='5' sm='12'>
          <Label className='mr-1' for='search-input'>
            ابحث:
          </Label>
          <Input
            className='dataTable-filter mb-50'
            type='text'
            bsSize='sm'
            id='search-input'
            value={searchTerm}
            onChange={handleFilter}
          />
        </Col>
        <Col md='5' sm='12'>

        </Col>
        <Col md='2' sm='12' className='d-flex align-items-center p-0'>
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
      </Row>
    </div>
  )
}

const DepartmentEmployeeDataTable = (props) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filteredData, setFilteredData] = useState([])
  const [pending, setPending] = useState(true)
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    setPending(true)
    if (props.data) {
      // setTimeout(() => {
      setColumns(props.columns)
      setData(props.data)
      setPending(false)
      // }, 500)
    } else {
      setColumns([])
      setData([])
      setPending(false)
    }
  }, [props.data, props.columns])
  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)
    setCurrentPage(1)
    if (value.length) {
      updatedData = data.filter(item => {
        let startsWith = false
        let includes = false
        Object.keys(item).map(key => {
          try {
            const element = item[key]
            if (element) {
              if (!startsWith) startsWith = handlerArabicSearch(element).startsWith(handlerArabicSearch(value))
              if (!includes) includes = handlerArabicSearch(element).includes(handlerArabicSearch(value))
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
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  const paginateArray = (array) => {
    return array?.slice(
      (currentPage - 1) * rowsPerPage, currentPage * rowsPerPage
    )
  }
  const dataToRender = () => {
    if (data.length === 0) {
      return []
    } else if (searchValue !== '') {
      if (rowsPerPage === 'all') {
        return filteredData
      }
      return paginateArray(filteredData)
    } else {
      if (rowsPerPage === 'all') {
        return data
      }
      return paginateArray(data)
    }
  }
  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }
  const handlePerPage = e => {
    const page = (e.target.value)
    setRowsPerPage(page)
  }
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = searchValue === '' ? (
      Math.ceil(data.length / rowsPerPage)
    ) : (
      Math.ceil(filteredData.length / rowsPerPage)
    )
    return (
      <ReactPaginate
        previousLabel=''
        nextLabel=''
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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
  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>
            <img
              src={'https://db.expand.ps/images/personal-information.png'}
              alt='user-avatar'
              className='img-fluid rounded' height='40' width='40' />
            {'موظفي القسم'}
          </CardTitle>
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
              <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
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
          selectableRows
          subHeader
          columns={columns}
          paginationPerPage={rowsPerPage}
          customStyles={customStyles}
          className='react-dataTable'
          subHeaderComponent={
            <CustomHeader
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchValue}
              handleFilter={handleFilter}
            />
          }
          progressPending={pending}
          progressComponent={
            <Table responsive className='custom-responsive-table' style={{ fontSize: '16px!important' }}>
              <thead>
                <tr>
                  <th className="">#</th>
                  <th className="text-left">اسم الموظف</th>
                  <th className="">المسمى الوظيفي</th>
                  <th className="">تاريخ البداية</th>
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
              <thead>
                <tr>
                  <th className="">#</th>
                  <th className="text-left">اسم الموظف</th>
                  <th className="">المسمى الوظيفي</th>
                  <th className="">تاريخ البداية</th>
                </tr>
              </thead>
              <tbody className='custom-table-body'>
                <tr>
                  <td className='text-center pt-2' colSpan='10'>
                    {pending ? (
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
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={dataToRender()}
          selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
    </Fragment>
  )
}

export default DepartmentEmployeeDataTable
